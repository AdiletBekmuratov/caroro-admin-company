import { ERROR_REQUIRED_FIELD } from "@/utils/error.messages";
import { z } from "zod";

export const VehicleSchema = z.object({
  vin: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  makeId: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  model: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  plateNumber: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  available: z.boolean({ required_error: ERROR_REQUIRED_FIELD }),
  enabled: z.boolean({ required_error: ERROR_REQUIRED_FIELD }),
  lon: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  lat: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  price: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  year: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  description: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  vehicleTypeId: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  gearboxId: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  engineId: z.string({ required_error: ERROR_REQUIRED_FIELD }),
});
export type VehiclesFormData = z.infer<typeof VehicleSchema>;
