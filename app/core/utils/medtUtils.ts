import {
  AttributeNode,
  DocumentNode,
  ElementNode,
  NameNode,
  OpeningTagNode,
} from "@medreporter/medtl-parser"
import { ModuleDocument, TemplateDocument } from "@medreporter/medtl-schema"

type RootElement<TDocument extends DocumentNode> = Extract<
  TDocument["content"][number],
  ElementNode
>

type ChildElements<TParent extends ElementNode> = Extract<TParent["children"][number], ElementNode>
type ChildElementNames<TParent extends ElementNode> =
  ChildElements<TParent>["openingTag"]["name"]["value"]
type ChildElementWithName<
  TParent extends ElementNode,
  TName extends ChildElementNames<TParent>
> = Extract<ChildElements<TParent>, ElementNode<OpeningTagNode<NameNode<TName>>>>

type ElementAttributes<TElement extends ElementNode> = TElement["openingTag"]["attributes"][number]
type ElementAttributeNames<TElement extends ElementNode> =
  ElementAttributes<TElement>["name"]["value"]
type ElementAttributeWithName<
  TElement extends ElementNode,
  TName extends ElementAttributeNames<TElement>
> = Extract<ElementAttributes<TElement>, AttributeNode<NameNode<TName>>>

const getRootElement = <TDocument extends ModuleDocument | TemplateDocument>(
  document: TDocument
): RootElement<TDocument> | null => {
  for (const content of document.content) {
    if (content.type === "Element") {
      return content as RootElement<TDocument>
    }
  }
  return null
}

const getChildElements = <TParent extends ElementNode, TName extends ChildElementNames<TParent>>(
  parent: TParent,
  name: TName
): ChildElementWithName<TParent, TName>[] =>
  parent.children.filter(
    (child): child is ChildElementWithName<TParent, TName> =>
      child.type === "Element" && child.openingTag.name.value === name
  )

const getChildElement = <TParent extends ElementNode, TName extends ChildElementNames<TParent>>(
  parent: TParent,
  name: TName
): ChildElementWithName<TParent, TName> | null => {
  const children = getChildElements(parent, name)
  if (children.length > 1) {
    throw new Error(
      `Multiple child elements with name '${name}' in parent element '${parent.openingTag.name.value}'.`
    )
  }
  if (children.length === 1) {
    return children[0]
  }
  return null
}

const getAttributes = <TElement extends ElementNode, TName extends ElementAttributeNames<TElement>>(
  element: TElement,
  name: TName
): ElementAttributeWithName<TElement, TName>[] =>
  element.openingTag.attributes.filter(
    (attribute): attribute is ElementAttributeWithName<TElement, TName> =>
      attribute.name.value === name
  )

const getAttribute = <TElement extends ElementNode, TName extends ElementAttributeNames<TElement>>(
  element: TElement,
  name: TName
): ElementAttributeWithName<TElement, TName> | null => {
  const attributes = getAttributes(element, name)
  if (attributes.length > 1) {
    throw new Error(
      `Multiple attributes with name '${name}' in element '${element.openingTag.name.value}'.`
    )
  }
  if (attributes.length === 1) {
    return attributes[0]
  }
  return null
}

export const getLanguages = (document: ModuleDocument | TemplateDocument): string[] => {
  const root = getRootElement(document)
  if (root) {
    const translations = getChildElement(root, "Translations")
    if (translations) {
      const languages = getChildElements(translations, "Language")
      return languages.map((language) => {
        const attr = getAttribute(language, "lng")
        if (!attr) {
          throw new Error("Missing 'lng' attr in 'Language' element.")
        }
        return attr.value.value
      })
    }
  }
  return []
}
