import { ERROR_REQUIRED_FIELD } from "@/utils/error.messages";
import { z } from "zod";

export const GearBoxSchema = z.object({
  name: z.string({ required_error: ERROR_REQUIRED_FIELD }),
});
export type GearBoxFormData = z.infer<typeof GearBoxSchema>;
