import { Make } from "@/types/entity.types";
import { baseApi } from "./baseApi";
import { PaginatedResponse } from "@/types/pagination.types";

// Define a service using a base URL and expected endpoints
export const makesApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Make"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCarBrands: builder.query<PaginatedResponse<Make>, void>({
        query: () => `/makes?page=1&limit=999999999999999`,
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: "Make" as const, id })),
                "Make",
              ]
            : ["Make"],
      }),
      updateCarBrands: builder.mutation<
        any,
        { data: Partial<Make>; id: number }
      >({
        query: ({ id, data }) => ({
          url: `/makes/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, arg) => [{ type: "Make", id: arg.id }],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCarBrandsQuery, useUpdateCarBrandsMutation } = makesApi;
