import { Engine, GearBox } from "@/types/entity.types";
import { baseApi } from "./baseApi";
import { GearBoxFormData } from "@/types/gearboxes.types";

// Define a service using a base URL and expected endpoints
export const enginesApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Engine"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getEngines: builder.query<Engine[], void>({
        query: () => `/engines`,
        providesTags: (result, error, arg) =>
          result
            ? // successful query
              [
                ...result.map(({ id }) => ({ type: "Engine", id } as const)),
                { type: "Engine", id: "LIST" },
              ]
            : [{ type: "Engine", id: "LIST" }],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEnginesQuery } = enginesApi;
