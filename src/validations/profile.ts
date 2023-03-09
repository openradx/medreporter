import { z } from "zod"

export const UpdateCurrentInstituteSchema = z.object({
  instituteId: z.string().nullable(),
})
