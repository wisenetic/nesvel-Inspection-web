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
import { api } from "@/core/api/axios/axios-instance";
import { normalizeAxiosError } from "@/core/api/axios/axios-error-handler";

/**
 * Axios-backed DataProvider aligned with Refine v5 signatures.
 */
export const apiDataProvider: DataProvider = {
  // -----------------------------------------------------
  // GET LIST
  // -----------------------------------------------------
  async getList<TData extends BaseRecord = BaseRecord>(
    params: GetListParams,
  ): Promise<GetListResponse<TData>> {
    try {
      const { resource, pagination, filters, sorters, meta } =
        params as any;

      const query: Record<string, unknown> = {
        ...(meta ?? {}),
      };

      // Pagination (backend expects page/pageSize)
      if (pagination) {
        const { current, pageSize } = pagination as any;
        if (current != null) query.page = current;
        if (pageSize != null) query.pageSize = pageSize;
      }

      // Filters (simple field = value mapping for now)
      if (Array.isArray(filters) && filters.length > 0) {
        (filters as any[]).forEach((f) => {
          if ("field" in f) {
            query[f.field] = f.value;
          }
        });
      }

      // Sorting: field:ASC,field2:DESC
      if (Array.isArray(sorters) && sorters.length > 0) {
        query.sort = (sorters as any[])
          .map((s) => `${s.field}:${s.order === "asc" ? "ASC" : "DESC"}`)
          .join(",");
      }

      const { data } = await api.get(`/${resource}`, { params: query });

      const items = (data as any).items ?? data;
      const total =
        (data as any).total ?? (Array.isArray(items) ? items.length : 0);

      return {
        data: items as TData[],
        total,
      };
    } catch (error) {
      throw normalizeAxiosError(error as any);
    }
  },

  // -----------------------------------------------------
  // GET ONE
  // -----------------------------------------------------
  async getOne<TData extends BaseRecord = BaseRecord>(
    params: GetOneParams,
  ): Promise<GetOneResponse<TData>> {
    try {
      const { resource, id, meta } = params as any;
      const { data } = await api.get(`/${resource}/${id}`, { params: meta });
      return { data: data as TData };
    } catch (error) {
      throw normalizeAxiosError(error as any);
    }
  },

  // -----------------------------------------------------
  // CREATE
  // -----------------------------------------------------
  async create<TData extends BaseRecord = BaseRecord, TVariables = any>(
    params: CreateParams<TVariables>,
  ): Promise<CreateResponse<TData>> {
    try {
      const { resource, variables, meta } = params as any;
      const { data } = await api.post(`/${resource}`, variables, {
        params: meta,
      });
      return { data: data as TData };
    } catch (error) {
      throw normalizeAxiosError(error as any);
    }
  },

  // -----------------------------------------------------
  // UPDATE
  // -----------------------------------------------------
  async update<TData extends BaseRecord = BaseRecord, TVariables = any>(
    params: UpdateParams<TVariables>,
  ): Promise<UpdateResponse<TData>> {
    try {
      const { resource, id, variables } = params as any;
      const { data } = await api.put(`/${resource}/${id}`, variables);
      return { data: data as TData };
    } catch (error) {
      throw normalizeAxiosError(error as any);
    }
  },

  // -----------------------------------------------------
  // DELETE ONE
  // -----------------------------------------------------
  async deleteOne<
    TData extends BaseRecord = BaseRecord,
    TVariables = {},
  >(
    params: DeleteOneParams<TVariables>,
  ): Promise<DeleteOneResponse<TData>> {
    try {
      const { resource, id } = params as any;
      const { data } = await api.delete(`/${resource}/${id}`);
      return { data: data as TData };
    } catch (error) {
      throw normalizeAxiosError(error as any);
    }
  },

  // -----------------------------------------------------
  // API URL (required by Refine v5 DataProvider)
  // -----------------------------------------------------
  getApiUrl: () => {
    // Delegate to Axios baseURL; refine mainly uses this for devtools
    return api.defaults.baseURL ?? "";
  },
};
