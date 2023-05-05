import { ERROR_REQUIRED_FIELD } from "@/utils/error.messages";
import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  body: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  image_url: z.string({ required_error: ERROR_REQUIRED_FIELD }),
});
export type BlogFormData = z.infer<typeof BlogSchema>;
