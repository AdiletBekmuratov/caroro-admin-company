import { Blog } from "@/components/Blog";
import { BlogFormData } from "@/types/blog.types";
import { baseApi } from "./baseApi";

// Define a service using a base URL and expected endpoints
export const blogApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Blog"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBlog: builder.query<Blog[], void>({
        query: () => `/articles`,
        providesTags: (result, error, arg) =>
          result
            ? // successful query
              [
                ...result.map(({ id }) => ({ type: "Blog", id } as const)),
                { type: "Blog", id: "LIST" },
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'Blog', id: 'LIST' }` is invalidated
              [{ type: "Blog", id: "LIST" }],
      }),
      updateBlog: builder.mutation<any, { data: BlogFormData; id: number }>({
        query: ({ data, id }) => ({
          url: `/articles/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, arg) => [{ type: "Blog", id: arg.id }],
      }),
      createBlog: builder.mutation<any, BlogFormData>({
        query: (body) => ({
          url: `/articles`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: [{ type: "Blog", id: "LIST" }],
      }),
      deleteBlog: builder.mutation<Blog, number>({
        query(id) {
          return {
            url: `/articles/${id}`,
            method: "DELETE",
          };
        },
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, id) => [{ type: "Blog", id }],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBlogQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
