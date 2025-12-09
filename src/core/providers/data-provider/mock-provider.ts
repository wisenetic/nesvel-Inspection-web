import type {
  BaseRecord,
  CreateParams,
  CreateResponse,
  DataProvider,
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

    const response = await fetch(`/mocks/${resource}/${resource}.json`);
    const rawData = await response.json();

    let records: TData[] = Array.isArray(rawData) ? rawData : [];

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

    const response = await fetch(`/mocks/${resource}/${resource}.json`);
    const data: TData[] = await response.json();

    const record = data.find((r) => r.id == id) as TData;

    return { data: record };
  },

  // ------------------------------------------
  // CREATE
  // ------------------------------------------
  async create<TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: CreateParams<TVariables>,
  ): Promise<CreateResponse<TData>> {
    await sleep(MOCK_LATENCY_MS);

    const { variables } = params as any;

    const id = crypto.randomUUID?.() ?? String(Math.random());
    const newRecord = { id, ...(variables as object) } as TData;

    return { data: newRecord };
  },

  // ------------------------------------------
  // UPDATE
  // ------------------------------------------
  async update<TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: UpdateParams<TVariables>,
  ): Promise<UpdateResponse<TData>> {
    await sleep(MOCK_LATENCY_MS);

    const { id, variables } = params as any;

    const updatedRecord = {
      id,
      ...(variables as object),
    } as TData;

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

    const { id } = params as any;

    return {
      data: { id } as unknown as TData,
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

  // Optional: getMany, updateMany, deleteMany, custom...
};
