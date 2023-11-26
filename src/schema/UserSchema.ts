import * as z from "zod";

export const UserShema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const UserEditSchema = UserShema.partial().extend({
  password: UserShema.shape.password.optional().or(z.literal('')),
});


