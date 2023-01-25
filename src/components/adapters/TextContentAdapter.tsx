import { ElementNode } from "@medreporter/medtl-parser"
import { TextElement } from "@medreporter/medtl-schema"
import {
  ContextData,
  createContext,
  ElementWrapper,
  evaluateExpression,
} from "@medreporter/medtl-tools"
import { OutputFormat } from "~/types/general"
import { Stub } from "../outputs/Stub"
import { Text } from "../outputs/Text"

interface TextContentAdapterProps {
  element: ElementNode
  data: ContextData
  lng: string
  format?: OutputFormat
  styling?: boolean
  bold?: boolean
  italic?: boolean
  capitalize?: boolean
  lower?: boolean
  upper?: boolean
}

export const TextContentAdapter = ({
  element,
  data,
  lng,
  format = "plain",
  styling = true,
  bold = false,
  italic = false,
  capitalize = false,
  lower = false,
  upper = false,
}: TextContentAdapterProps) => {
  const context = createContext(data, lng)

  let textEl: ElementWrapper<TextElement> | null = null
  if (element.kind === "Text") {
    textEl = new ElementWrapper(element as TextElement)
  }

  const if_ = textEl?.getAttribute("if")?.getBooleanValue(context)
  if (if_ === false) return null

  const lngs =
    textEl
      ?.getAttribute("lng")
      ?.getStringValue()
      .split(",")
      .map((str) => str.trim()) ?? []

  if (lngs.length && !lngs.includes(lng)) return null

  const bold_ = textEl?.getAttribute("bold")?.getBooleanValue(context)
  const italic_ = textEl?.getAttribute("italic")?.getBooleanValue(context)
  const lower_ = textEl?.getAttribute("lower")?.getBooleanValue(context)
  const upper_ = textEl?.getAttribute("upper")?.getBooleanValue(context)
  const capitalize_ = textEl?.getAttribute("capitalize")?.getBooleanValue(context)
  // TODO: each attribute

  let stop = false
  const adaptedChildren = textEl?.element.children.map((child, idx) => {
    if (stop) return null

    if (child.type === "Element") {
      if (child.kind === "Text") {
        const wrappedChild = new ElementWrapper(child)
        stop = wrappedChild.getAttribute("stop")?.getBooleanValue(context) ?? false
        return (
          <TextContentAdapter
            key={idx}
            element={wrappedChild.element}
            bold={bold || bold_}
            italic={italic || italic_}
            capitalize={capitalize || capitalize_}
            lower={lower || lower_}
            upper={upper || upper_}
            {...{ data, lng, format, styling }}
          />
        )
      }

      if (child.kind === "Stub") {
        return <Stub {...{ format, styling }} />
      }
    }

    let str = ""

    if (child.type === "Chardata") {
      str = child.value
    } else if (child.type === "ExpressionContainer") {
      str = child.expression === null ? "" : String(evaluateExpression(child.expression, context))
    }

    if (lower || lower_) {
      str = str.toLocaleLowerCase()
    }

    if (upper || upper_) {
      str = str.toLocaleUpperCase()
    }

    if (capitalize || capitalize_) {
      str = str.charAt(0).toLocaleUpperCase() + str.slice(1)
    }

    return (
      <Text
        key={idx}
        format={format}
        bold={styling && (bold || bold_)}
        italic={styling && (italic || italic_)}
      >
        {str}
      </Text>
    )
  })

  return <Text {...{ format, bold, italic }}>{adaptedChildren?.filter(Boolean)}</Text>
}
