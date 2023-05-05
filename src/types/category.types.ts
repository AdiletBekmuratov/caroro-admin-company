import { ERROR_REQUIRED_FIELD } from "@/utils/error.messages";
import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string({ required_error: ERROR_REQUIRED_FIELD }),
});
export type CategoryFormData = z.infer<typeof CategorySchema>;
