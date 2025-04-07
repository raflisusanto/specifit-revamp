import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Masukkan nama"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(5, "Password minimal 5 karakter"),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
