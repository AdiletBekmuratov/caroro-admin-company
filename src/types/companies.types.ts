import { ERROR_REQUIRED_FIELD } from "@/utils/error.messages";
import { z } from "zod";

export const CompanySchema = z.object({
  email: z.string({ required_error: ERROR_REQUIRED_FIELD }).email(),
  address: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  name: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  description: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  phone: z.string({ required_error: ERROR_REQUIRED_FIELD }),
});
export type CompanyFormData = z.infer<typeof CompanySchema>;
