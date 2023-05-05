import { ERROR_REQUIRED_FIELD } from "@/utils/error.messages";
import { z } from "zod";

export const VehicleSchema = z.object({
  vin: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  makeId: z.number({ required_error: ERROR_REQUIRED_FIELD }),
  model: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  plateNumber: z.number({ required_error: ERROR_REQUIRED_FIELD }),
  available: z.boolean({ required_error: ERROR_REQUIRED_FIELD }),
  lon: z.number({ required_error: ERROR_REQUIRED_FIELD }),
  lat: z.number({ required_error: ERROR_REQUIRED_FIELD }),
  price: z.number({ required_error: ERROR_REQUIRED_FIELD }),
  year: z.number({ required_error: ERROR_REQUIRED_FIELD }),
  otherInfo: z
    .object({
      description: z.string({ required_error: ERROR_REQUIRED_FIELD }),
      label: z.string({ required_error: ERROR_REQUIRED_FIELD }),
    })
    .array(),
  description: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  vehicleTypeId: z.number({ required_error: ERROR_REQUIRED_FIELD }),
  gearboxId: z.number({ required_error: ERROR_REQUIRED_FIELD }),
  engineId: z.number({ required_error: ERROR_REQUIRED_FIELD }),
  companyId: z.number({ required_error: ERROR_REQUIRED_FIELD }),
});
export type VehiclesFormData = z.infer<typeof VehicleSchema>;
