import { ElementInputSchema } from "@medtl/schema"

const Tag: ElementInputSchema = {
  name: "Tag",
  description: "A short tag for searching and filtering.",
  cardinality: "many",
  textContent: true,
}

export const Tags: ElementInputSchema = {
  name: "Tags",
  description: "A collection of tags for searching and filtering.",
  elements: { Tag },
}

const T: ElementInputSchema = {
  name: "T",
  description: "Element to provide the translation for one id.",
  cardinality: "many",
  attributes: {
    key: {
      name: "key",
      description:
        "Key of the translation. Use the same key for this word/phrase in every language. Use the key in an expression with the t function for translation.",
      required: true,
      value: "static",
    },
  },
  textContent: true,
}

const Language: ElementInputSchema = {
  name: "Language",
  description: "Element for defining a language.",
  cardinality: "many",
  required: true,
  attributes: {
    lng: {
      name: "lng",
      description: "Code for the language according to ISO 639-1.",
      required: true,
      value: "static",
    },
  },
  elements: { T },
}

export const Translations: ElementInputSchema = {
  name: "Translations",
  description: "Element to provide the translations.",
  elements: {
    Language,
  },
}
