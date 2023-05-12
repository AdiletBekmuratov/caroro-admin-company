import { ERROR_REQUIRED_FIELD } from "@/utils/error.messages";
import { z } from "zod";

export const OrderSchema = z.object({
  finalPrice: z.number({ required_error: ERROR_REQUIRED_FIELD }),
  userId: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  companyId: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  vehicleId: z.string({ required_error: ERROR_REQUIRED_FIELD }),
});
export type OrdersFormData = z.infer<typeof OrderSchema>;
