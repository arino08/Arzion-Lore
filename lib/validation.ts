import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine((url) => {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
      return imageExtensions.some(ext => url.endsWith(ext));
    }, {
      message: "The link must be a valid image URL ending with .jpg, .jpeg, .png, .gif, .bmp, or .webp",
    }),
  Content: z.string().min(10),
});