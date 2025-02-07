import { z } from "zod";

export const UserModel = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const VideoModel = z.object({
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
