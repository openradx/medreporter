import { parse } from "@medreporter/medtl-parser"
import {
  DocumentOutputSchema,
  ModuleDocument,
  ModuleSchema,
  TemplateDocument,
  validate,
} from "@medreporter/medtl-schema"

export class ParsingError extends Error {}

const parseMedtlCode = (sourceCode: string, schema: DocumentOutputSchema) => {
  const { document, errors } = parse(sourceCode)

  if (!document || errors.length > 0) {
    throw new ParsingError("Invalid MedTL document.")
  }

  const issues = validate(document, schema)

  if (issues.length > 0) {
    throw new ParsingError("Invalid MedTL document.")
  }

  return document
}

export const parseModuleCode = (code: string) => {
  const document = parseMedtlCode(code, ModuleSchema)
  return document as ModuleDocument
}

export const parseTemplateCode = (code: string) => {
  const document = parseMedtlCode(code, ModuleSchema)
  return document as TemplateDocument
}
