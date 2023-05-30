import { Vehicle } from "@/components/Vehicles";
import { VehiclesFormData } from "@/types/vehicles.types";
import { baseApi } from "./baseApi";
import { PaginatedResponse } from "@/types/pagination.types";

// Define a service using a base URL and expected endpoints
export const vehiclesApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Vehicles"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getVehicles: builder.query<PaginatedResponse<Vehicle>, number>({
        query: (companyId) =>
          `/vehicles?page=1&limit=9999999999&filter.companyId=$eq:${companyId}`,
        providesTags: (result, error, arg) =>
          result
            ? // successful query
              [
                ...result.data.map(
                  ({ id }) => ({ type: "Vehicles", id } as const)
                ),
                { type: "Vehicles", id: "LIST" },
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'Company', id: 'LIST' }` is invalidated
              [{ type: "Vehicles", id: "LIST" }],
      }),
      updateVehicle: builder.mutation<
        any,
        { data: VehiclesFormData; id: number }
      >({
        query: ({ data, id }) => ({
          url: `/vehicles/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Vehicles", id: arg.id },
        ],
      }),
      createVehicle: builder.mutation<any, VehiclesFormData>({
        query: (body) => ({
          url: `/vehicles`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: [{ type: "Vehicles", id: "LIST" }],
      }),
      deleteVehicle: builder.mutation<Vehicle, number>({
        query(id) {
          return {
            url: `/vehicles/${id}`,
            method: "DELETE",
          };
        },
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, id) => [{ type: "Vehicles", id }],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetVehiclesQuery,
  useUpdateVehicleMutation,
  useCreateVehicleMutation,
  useDeleteVehicleMutation,
} = vehiclesApi;
