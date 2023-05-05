import { VehicleType } from "@/types/entity.types";
import { baseApi } from "./baseApi";
import { VehicleTypeFormData } from "@/types/vehicleType.types";

// Define a service using a base URL and expected endpoints
export const vehicleTypesApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["VehicleType"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getVehicleType: builder.query<VehicleType[], void>({
        query: () => `/vehicle-types`,
        providesTags: (result, error, arg) =>
          result
            ? // successful query
              [
                ...result.map(
                  ({ id }) => ({ type: "VehicleType", id } as const)
                ),
                { type: "VehicleType", id: "LIST" },
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'VehicleType', id: 'LIST' }` is invalidated
              [{ type: "VehicleType", id: "LIST" }],
      }),
      updateVehicleType: builder.mutation<
        any,
        { data: VehicleTypeFormData; id: number }
      >({
        query: ({ data, id }) => ({
          url: `/vehicle-types/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "VehicleType", id: arg.id },
        ],
      }),
      createVehicleType: builder.mutation<any, VehicleTypeFormData>({
        query: (body) => ({
          url: `/vehicle-types`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: [{ type: "VehicleType", id: "LIST" }],
      }),
      deleteVehicleType: builder.mutation<VehicleType, number>({
        query(id) {
          return {
            url: `/vehicle-types/${id}`,
            method: "DELETE",
          };
        },
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, id) => [{ type: "VehicleType", id }],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetVehicleTypeQuery,
  useCreateVehicleTypeMutation,
  useDeleteVehicleTypeMutation,
  useUpdateVehicleTypeMutation,
} = vehicleTypesApi;
