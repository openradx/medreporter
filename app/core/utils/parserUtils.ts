import { parse, ParserError } from "@medreporter/medtl-parser"
import {
  DocumentOutputSchema,
  ModuleDocument,
  ModuleSchema,
  TemplateDocument,
  validate,
  ValidationIssue,
} from "@medreporter/medtl-schema"

export class ParsingError extends Error {
  constructor(public parserErrors: ParserError[], public validationIssues: ValidationIssue[]) {
    super("Invalid MedTL document.")
  }
}

const parseMedtlCode = (sourceCode: string, schema: DocumentOutputSchema) => {
  const { document, errors } = parse(sourceCode)

  if (!document || errors.length > 0) {
    throw new ParsingError(errors, [])
  }

  const issues = validate(document, schema)

  if (issues.length > 0) {
    throw new ParsingError([], issues)
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
