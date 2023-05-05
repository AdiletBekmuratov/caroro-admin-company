import { Category } from "@/types/entity.types";
import { baseApi } from "./baseApi";
import { CategoryFormData } from "@/types/category.types";

// Define a service using a base URL and expected endpoints
export const categoriesApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Category"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCategories: builder.query<Category[], void>({
        query: () => `/categories`,
        providesTags: (result, error, arg) =>
          result
            ? // successful query
              [
                ...result.map(({ id }) => ({ type: "Category", id } as const)),
                { type: "Category", id: "LIST" },
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'Category', id: 'LIST' }` is invalidated
              [{ type: "Category", id: "LIST" }],
      }),
      updateCategory: builder.mutation<
        any,
        { data: CategoryFormData; id: number }
      >({
        query: ({ data, id }) => ({
          url: `/categories/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Category", id: arg.id },
        ],
      }),
      createCategory: builder.mutation<any, CategoryFormData>({
        query: (body) => ({
          url: `/categories`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: [{ type: "Category", id: "LIST" }],
      }),
      deleteCategory: builder.mutation<Category, number>({
        query(id) {
          return {
            url: `/categories/${id}`,
            method: "DELETE",
          };
        },
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, id) => [{ type: "Category", id }],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} = categoriesApi;
