import { CompanyFormData } from "@/types/companies.types";
import { baseApi } from "./baseApi";
import { PaginatedResponse } from "@/types/pagination.types";
import { Company } from "@/types/entity.types";

// Define a service using a base URL and expected endpoints
export const companiesApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Company"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCompanies: builder.query<PaginatedResponse<Company>, void>({
        query: () => `/companies?page=1&limit=9999999999`,
        providesTags: (result, error, arg) =>
          result
            ? // successful query
              [
                ...result.data.map(
                  ({ id }) => ({ type: "Company", id } as const)
                ),
                { type: "Company", id: "LIST" },
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'Company', id: 'LIST' }` is invalidated
              [{ type: "Company", id: "LIST" }],
      }),
      updateCompany: builder.mutation<
        any,
        { data: CompanyFormData; id: number }
      >({
        query: ({ data, id }) => ({
          url: `/companies/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Company", id: arg.id },
        ],
      }),
      createCompany: builder.mutation<any, CompanyFormData>({
        query: (body) => ({
          url: `/companies`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: [{ type: "Company", id: "LIST" }],
      }),
      deleteCompany: builder.mutation<Company, number>({
        query(id) {
          return {
            url: `/companies/${id}`,
            method: "DELETE",
          };
        },
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, id) => [{ type: "Company", id }],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCompaniesQuery,
  useUpdateCompanyMutation,
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApi;
