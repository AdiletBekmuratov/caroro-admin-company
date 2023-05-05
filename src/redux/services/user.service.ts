import { baseApi } from "./baseApi";
import { Users } from "@/components/Users";
import { UserFormData } from "@/types/users.types";

// Define a service using a base URL and expected endpoints
export const userApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Users"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query<Users[], void>({
        query: () => `/users`,
        providesTags: (result, error, arg) =>
          result
            ? // successful query
              [
                ...result.map(({ id }) => ({ type: "Users", id } as const)),
                { type: "Users", id: "LIST" },
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'GearBox', id: 'LIST' }` is invalidated
              [{ type: "Users", id: "LIST" }],
      }),
      updateUser: builder.mutation<
        any,
        { data: Omit<UserFormData, "password" | "companyId">; id: number }
      >({
        query: ({ data, id }) => ({
          url: `/users/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Users", id: arg.id },
        ],
      }),
      createUser: builder.mutation<any, UserFormData>({
        query: (body) => ({
          url: `/users`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: [{ type: "Users", id: "LIST" }],
      }),
      deleteUser: builder.mutation<Users, number>({
        query(id) {
          return {
            url: `/users/${id}`,
            method: "DELETE",
          };
        },
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, id) => [{ type: "Users", id }],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
} = userApi;
