import { ERROR_REQUIRED_FIELD } from "@/utils/error.messages";
import { z } from "zod";

export const VehicleTypeSchema = z.object({
  name: z.string({ required_error: ERROR_REQUIRED_FIELD }),
});
export type VehicleTypeFormData = z.infer<typeof VehicleTypeSchema>;
