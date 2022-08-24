import {
  AttributeInputSchema,
  compileSchema,
  DocumentInputSchema,
  ElementInputSchema,
} from "@medtl/schema"
import { Tags, Translations } from "./commonSchema"

const FieldAttributes: Record<string, AttributeInputSchema> = {
  id: {
    name: "id",
    description: "Identifier of the field, always required.",
    required: true,
    value: "static",
  },
  label: {
    name: "label",
    description: "Label of the field. Use expression with the t function for translation.",
  },
  value: {
    name: "value",
    description:
      "Initial value of the input. If not defined the field will be empty initially or nothing will be selected.",
  },
  visible: {
    name: "visible",
    description:
      "If true the field is visible, if false the field isn't visible in the form. Enter an expression to hinge the field on other fields.",
  },
  export: {
    name: "export",
    description: "If set then the value of this field is also visible to other modules.",
    //value: "none" // TODO:
  },
}

const FieldExtras: Record<string, ElementInputSchema> = {
  Info: {
    name: "Info",
    description: "Add further information to the field.",
  },
  Graphics: {
    name: "Graphics",
    description:
      "Add an image to the field to provide some help with the anatomy or classfication etc.",
  },
}

const NumberField: ElementInputSchema = {
  name: "NumberField",
  description: "A field to input decimal or integer values.",
  cardinality: "many",
  attributes: {
    ...FieldAttributes,
    unit: { name: "unit", description: "Unit belonging to the input value." },
    min: {
      name: "min",
      description:
        "Minimal value of the input. If lower value is put in, it will be changed to the minimal value when leaving the field.",
    },
    max: {
      name: "max",
      description:
        "Maximal value of the input. If higher value is put in, it will be changed to the maximal value when leaving the field.",
    },
    precision: {
      name: "precision",
      description:
        "Number of possible decimal spaces. If more decimal spaces are put in, the value will be rounded accordingly.",
    },
  },
  elements: { ...FieldExtras },
}

const FreeTextField: ElementInputSchema = {
  name: "TextField",
  description: "A field to input text content.",
  cardinality: "many",
  attributes: {
    ...FieldAttributes,
  },
  elements: { ...FieldExtras },
}

const DateField: ElementInputSchema = {
  name: "DateField",
  description: "A field to input a date.",
  cardinality: "many",
  attributes: {
    ...FieldAttributes,
  },
  elements: { ...FieldExtras },
}

const FieldOptions: ElementInputSchema = {
  name: "Options",
  description: "A collection of options for select and choice fields.",
  elements: {
    Option: {
      name: "Option",
      description: "A selectable option.",
      cardinality: "many",
      attributes: {
        value: {
          name: "value",
          description: "The value to use when this option is selected.",
          value: "static",
        },
      },
      textContent: true,
    },
  },
}

const SingleChoiceField: ElementInputSchema = {
  name: "SingleChoiceField",
  description:
    "A field for choosing a single option. Recommended for up to four options " +
    "(for more options see SingleSelectField).",
  cardinality: "many",
  attributes: {
    ...FieldAttributes,
  },
  elements: {
    ...FieldExtras,
    Options: FieldOptions,
  },
}

const MultipleChoiceField: ElementInputSchema = {
  name: "MultipleChoiceField",
  description:
    "A field for choosing multiple options. Recommended for up to four options " +
    "(for more options see MultipleSelectField).",
  cardinality: "many",
  attributes: {
    ...FieldAttributes,
  },
  elements: {
    ...FieldExtras,
    Options: FieldOptions,
  },
}

const SingleSelectField: ElementInputSchema = {
  name: "SingleSelectField",
  description:
    "A field for choosing a single option. Recommended for more than four options " +
    "(for less options see SingleChoiceField).",
  cardinality: "many",
  attributes: {
    ...FieldAttributes,
  },
  elements: {
    options: FieldOptions,
  },
}

const MultipleSelectField: ElementInputSchema = {
  name: "MultipleSelectField",
  description:
    "A field for choosing multiple options. Recommended for more than four options " +
    "(for less options see MultipleChoiceField).",
  cardinality: "many",
  attributes: {
    ...FieldAttributes,
  },
  elements: {
    ...FieldExtras,
    Options: FieldOptions,
  },
}

const MeasurementsTable: ElementInputSchema = {
  name: "MeasurementsTable",
  description: "A table to input measurements.",
  cardinality: "many",
  attributes: {
    ...FieldAttributes,
    previous: {
      name: "previous",
      description: "Option for adding an comparison to a previous timepoint (true/false).",
    },
    rows: {
      name: "rows",
      description: "Initial number of rows. If not provided, the table has one row.",
    },
    dims: {
      name: "dims",
      description: "Initial number of dimensions. If not provided, the table has one dimension.",
    },
  },
  elements: { ...FieldExtras },
}

export const Fields = {
  NumberField,
  FreeTextField,
  DateField,
  SingleChoiceField,
  MultipleChoiceField,
  SingleSelectField,
  MultipleSelectField,
  MeasurementsTable,
}

const Link: ElementInputSchema = {
  name: "Link",
  description: "An external link for more information.",
  cardinality: "many",
  attributes: {
    url: {
      name: "url",
      description:
        "URLs to the external website. Use string for one link or an array of strings for more than one link.",
    },
  },
}

const Links: ElementInputSchema = {
  name: "Links",
  description: "A collection of links.",
  elements: { Link },
}

const Group: ElementInputSchema = {
  name: "Group",
  description:
    "Element for grouping multiple fields without additional descision (if desired use Finding instead).",
  cardinality: "many",
  attributes: {
    ...FieldAttributes,
  },
  elements: {
    ...Fields,
    Links,
  },
}

const Finding: ElementInputSchema = {
  name: "Finding",
  description:
    "Element for grouping multiple field with additional switch (if not desired use Group instead).",
  cardinality: "many",
  attributes: {
    ...FieldAttributes,
  },
  elements: {
    Links,
    Group,
    ...Fields,
  },
}

const Structure: ElementInputSchema = {
  name: "Structure",
  description: "The form of the module. Here you can use all the different fields.",
  required: true,
  elements: {
    Links,
    Finding,
    Group,
    ...Fields,
  },
}

const Statement: ElementInputSchema = {
  name: "Statement",
  description: "Element for toggling between different statements inside the context.",
  attributes: {
    visible: { name: "visible", description: "Condition under which the statement is visible." },
  },
  textContent: true,
}

const Conclusion: ElementInputSchema = {
  name: "Conclusion",
  description:
    "Conclusions will be written at the end of the report. They can be rated by with using a priority attribute.",
  attributes: {
    visible: { name: "visible", description: "Condition under which the statement is visible." },
    priority: {
      name: "priority",
      description: "Rate the importance of conclusion (low, medium, high or critical).",
      value: ["low", "medium", "high", "critical"],
    },
  },
}

const Context: ElementInputSchema = {
  name: "Context",
  description:
    "Element for inserting a group of statements in the report and setting a context for all of its contained statements.",
  cardinality: "many",
  attributes: {
    visible: {
      name: "visible",
      description: "Condition under which the context and so the contained statements is visible.",
    },
    assign: {
      name: "assign",
      description: "Assign variables to use in the contained statements with the operator as.",
    },
  },
  elements: {
    Statement,
    Conclusion,
  },
}

export const Report: ElementInputSchema = {
  name: "Report",
  description: "Element for defining the resulting report for the module.",
  required: true,
  elements: {
    Context,
    Statement,
    Conclusion,
  },
}

const Module: ElementInputSchema = {
  name: "Module",
  description: "Root element for writing a new module.",
  required: true,
  attributes: {
    title: {
      name: "title",
      description: "A meaningful title of this module.",
      required: true,
    },
    description: {
      name: "description",
      description: "A more detailed description what this module is about.",
    },
  },
  elements: {
    Translations,
    Tags,
    Structure,
    Report,
  },
}

const Document: DocumentInputSchema = {
  elements: { Module },
}

export const ModuleSchema = compileSchema(Document)
