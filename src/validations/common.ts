import { z } from "zod"

export const PaginationSchema = z.object({
  skip: z.number().min(0).default(0),
  take: z.number().min(0).max(1000).default(100),
})
