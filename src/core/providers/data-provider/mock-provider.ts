import type {
  BaseRecord,
  CreateParams,
  CreateResponse,
  DataProvider,
  DeleteManyParams,
  DeleteManyResponse,
  DeleteOneParams,
  DeleteOneResponse,
  GetListParams,
  GetListResponse,
  GetOneParams,
  GetOneResponse,
  UpdateParams,
  UpdateResponse,
} from "@refinedev/core";

const MOCK_LATENCY_MS = 600;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type AnyRecord = Record<string, any>;

function storageAvailable() {
  try {
    if (typeof window === "undefined") return false;
    const key = "__ims_mock_test__";
    window.localStorage.setItem(key, "1");
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function storeKey(resource: string) {
  return `ims:mock:${resource}`;
}

async function loadResourceData<TData extends BaseRecord = BaseRecord>(
  resource: string,
): Promise<TData[]> {
  // Prefer persisted data if available.
  if (storageAvailable()) {
    const raw = window.localStorage.getItem(storeKey(resource));
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as TData[];
      } catch {
        // ignore parse errors and fall back to seed
      }
    }
  }

  // Seed from static JSON.
  const response = await fetch(`/mocks/${resource}/${resource}.json`);
  const seed = await response.json();
  const records: TData[] = Array.isArray(seed) ? (seed as TData[]) : [];

  if (storageAvailable()) {
    window.localStorage.setItem(storeKey(resource), JSON.stringify(records));
  }

  return records;
}

function saveResourceData(resource: string, records: AnyRecord[]) {
  if (!storageAvailable()) return;
  window.localStorage.setItem(storeKey(resource), JSON.stringify(records));
}

/**
 * ENTERPRISE-GRADE MOCK DATA PROVIDER
 * - Supports filtering, sorting, pagination
 * - Compatible with refine DataProvider interface
 * - Local JSON files in /public/mocks/{resource}/{resource}.json
 */
export const mockDataProvider: DataProvider = {
  // ------------------------------------------
  // GET LIST
  // ------------------------------------------
  async getList<TData extends BaseRecord = BaseRecord>(
    params: GetListParams,
  ): Promise<GetListResponse<TData>> {
    await sleep(MOCK_LATENCY_MS);

    const { resource, pagination, sorters, filters } = params as any;

    let records: TData[] = await loadResourceData<TData>(resource);

    // Filtering
    if (Array.isArray(filters) && filters.length) {
      (filters as any[]).forEach((filter) => {
        if (!("field" in filter)) return;
        const { field, operator, value } = filter;

        records = records.filter((r: any) => {
          const v = r[field];

          switch (operator) {
            case "eq":
              return v === value;
            case "ne":
              return v !== value;
            case "contains":
              return String(v)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case "gte":
              return v >= value;
            case "lte":
              return v <= value;
            default:
              return true;
          }
        });
      });
    }

    // Sorting (first sorter only)
    if (Array.isArray(sorters) && sorters.length) {
      const { field, order } = (sorters as any[])[0];
      records = [...records].sort((a: any, b: any) => {
        if (a[field] === b[field]) return 0;
        return a[field] > b[field]
          ? order === "asc"
            ? 1
            : -1
          : order === "asc"
          ? -1
          : 1;
      });
    }

    // Pagination
    const current = (pagination as any)?.current ?? 1;
    const pageSize = (pagination as any)?.pageSize ?? 10;
    const start = (current - 1) * pageSize;
    const paginated = records.slice(start, start + pageSize);

    return {
      data: paginated,
      total: records.length,
    };
  },

  // ------------------------------------------
  // GET ONE
  // ------------------------------------------
  async getOne<TData extends BaseRecord = BaseRecord>(
    params: GetOneParams,
  ): Promise<GetOneResponse<TData>> {
    await sleep(MOCK_LATENCY_MS);

    const { resource, id } = params as any;

    const data = await loadResourceData<TData>(resource);

    const record = data.find((r: any) => r.id == id) as TData;

    return { data: record };
  },

  // ------------------------------------------
  // CREATE
  // ------------------------------------------
  async create<TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: CreateParams<TVariables>,
  ): Promise<CreateResponse<TData>> {
    await sleep(MOCK_LATENCY_MS);

    const { resource, variables } = params as any;

    const records = await loadResourceData<TData>(resource);

    const id = crypto.randomUUID?.() ?? String(Math.random());
    const newRecord = { id, ...(variables as object) } as TData;

    // Add to the front so it appears immediately on page 1.
    const next = [newRecord as any, ...(records as any[])];
    saveResourceData(resource, next as any);

    return { data: newRecord };
  },

  // ------------------------------------------
  // UPDATE
  // ------------------------------------------
  async update<TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: UpdateParams<TVariables>,
  ): Promise<UpdateResponse<TData>> {
    await sleep(MOCK_LATENCY_MS);

    const { resource, id, variables } = params as any;

    const records = await loadResourceData<TData>(resource);

    const idx = (records as any[]).findIndex((r) => r?.id == id);

    const updatedRecord = {
      ...(idx >= 0 ? (records as any[])[idx] : {}),
      ...(variables as object),
      id,
    } as TData;

    const next = [...(records as any[])];
    if (idx >= 0) {
      next[idx] = updatedRecord as any;
    } else {
      next.unshift(updatedRecord as any);
    }
    saveResourceData(resource, next as any);

    return { data: updatedRecord };
  },

  // ------------------------------------------
  // DELETE ONE
  // ------------------------------------------
  async deleteOne<
    TData extends BaseRecord = BaseRecord,
    TVariables = {},
  >(
    params: DeleteOneParams<TVariables>,
  ): Promise<DeleteOneResponse<TData>> {
    await sleep(MOCK_LATENCY_MS);

    const { resource, id } = params as any;

    const records = await loadResourceData<TData>(resource);
    const next = (records as any[]).filter((r) => r?.id != id);
    saveResourceData(resource, next as any);

    return {
      data: { id } as unknown as TData,
    };
  },

  // ------------------------------------------
  // DELETE MANY
  // ------------------------------------------
  async deleteMany<
    TData extends BaseRecord = BaseRecord,
    TVariables = {},
  >(
    params: DeleteManyParams<TVariables>,
  ): Promise<DeleteManyResponse<TData>> {
    await sleep(MOCK_LATENCY_MS);

    const { resource, ids } = params as any;

    const records = await loadResourceData<TData>(resource);
    const idSet = new Set((ids as any[])?.map((x) => String(x)) ?? []);
    const next = (records as any[]).filter((r) => !idSet.has(String(r?.id)));
    saveResourceData(resource, next as any);

    return {
      data: (ids as any[]).map((id) => ({ id }) as unknown as TData),
    };
  },

  // ------------------------------------------
  // API URL (required by Refine v5 DataProvider)
  // ------------------------------------------
  getApiUrl: () => {
    // In mock mode, the logical API root is /mocks; refine mostly uses
    // this for devtools and link generation.
    return "/mocks";
  },

  // Optional: getMany, updateMany, custom...
};
