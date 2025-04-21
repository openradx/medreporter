import { ReleaseStatus, Visibility } from "@prisma/client"
import { z } from "zod"
import { nodeSchema } from "./common"
import { reportNodeSchema } from "./report"
import { structureNodeSchema } from "./structure"

export const buildTemplateNodeSchema = (message?: string) =>
  nodeSchema.extend({
    type: z.literal("Template"),
    id: z.literal("").or(z.string().cuid2()),
    slug: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .regex(/^[a-z0-9-_]*$/i, message),
    title: z.string().trim().min(1).max(100),
    language: z.string().regex(/^([a-z]{2})(-[A-Z]{2})?$/),
    description: z.string().trim().max(1000),
    structure: structureNodeSchema,
    report: reportNodeSchema,
    visibility: z.nativeEnum(Visibility),
    releaseStatus: z.nativeEnum(ReleaseStatus),
    categories: z.array(z.string().trim().min(1).max(100)),
  })

export type TemplateNode = z.infer<ReturnType<typeof buildTemplateNodeSchema>>
