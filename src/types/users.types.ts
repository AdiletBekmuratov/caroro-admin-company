import { ERROR_REQUIRED_FIELD } from "@/utils/error.messages";
import { z } from "zod";

export const UserSchema = z.object({
  email: z.string({ required_error: ERROR_REQUIRED_FIELD }).email(),
  password: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  role:z.string({ required_error: ERROR_REQUIRED_FIELD }),
  companyId:z.string({ required_error: ERROR_REQUIRED_FIELD }),
  firstname: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  lastname: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  phone: z.string({ required_error: ERROR_REQUIRED_FIELD }),
});
export type UserFormData = z.infer<typeof UserSchema>;
