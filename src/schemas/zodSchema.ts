import { z } from "zod";

export const SignUpModel = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const SignInModel = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const VideoModal = z.object({
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  thumbnailUrl: z.string(),
  controls: z.boolean().optional(),
  isValid: z.boolean().optional(),
  createdAt: z.date().optional(),
  transformation: z
    .object({
      height: z.number(),
      width: z.number(),
    })
    .optional(),
});
