import { GearBox } from "@/components/GearBox";
import { baseApi } from "./baseApi";
import { GearBoxFormData } from "@/types/gearboxes.types";

// Define a service using a base URL and expected endpoints
export const gearboxesApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["GearBox"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getGearBoxes: builder.query<GearBox[], void>({
        query: () => `/gearboxes`,
        providesTags: (result, error, arg) =>
          result
            ? // successful query
              [
                ...result.map(({ id }) => ({ type: "GearBox", id } as const)),
                { type: "GearBox", id: "LIST" },
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'GearBox', id: 'LIST' }` is invalidated
              [{ type: "GearBox", id: "LIST" }],
      }),
      updateGearBox: builder.mutation<
        any,
        { data: GearBoxFormData; id: number }
      >({
        query: ({ data, id }) => ({
          url: `/gearboxes/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "GearBox", id: arg.id },
        ],
      }),
      createGearBox: builder.mutation<any, GearBoxFormData>({
        query: (body) => ({
          url: `/gearboxes`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: [{ type: "GearBox", id: "LIST" }],
      }),
      deleteGearBox: builder.mutation<GearBox, number>({
        query(id) {
          return {
            url: `/gearboxes/${id}`,
            method: "DELETE",
          };
        },
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, id) => [{ type: "GearBox", id }],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetGearBoxesQuery,
  useUpdateGearBoxMutation,
  useCreateGearBoxMutation,
  useDeleteGearBoxMutation,
} = gearboxesApi;
