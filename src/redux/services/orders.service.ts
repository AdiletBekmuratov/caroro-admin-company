import { Order } from "@/components/Orders";
import { baseApi } from "./baseApi";

// Define a service using a base URL and expected endpoints
export const ordersApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Order"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getOrders: builder.query<Order[], void>({
        query: () => `/orders/company`,
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOrdersQuery } = ordersApi;
