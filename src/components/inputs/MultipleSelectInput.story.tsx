import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { MultipleSelectInput } from "./MultipleSelectInput"

export default {
  title: "Inputs / MultipleSelectInput",
  component: MultipleSelectInput,
} as ComponentMeta<typeof MultipleSelectInput>

const Template: ComponentStory<typeof MultipleSelectInput> = ({ label, options }) => {
  const [value, setValue] = useState<string[]>([])
  return (
    <InputLayout>
      <MultipleSelectInput value={value} onChange={setValue} {...{ label, options }} />
    </InputLayout>
  )
}
export const Basic = Template.bind({})
Basic.args = {
  label: "Brain arteries",
  options: [
    { value: "aci", label: "A. carotis interna" },
    { value: "aca", label: "A. cerebri anterior" },
    { value: "mca", label: "A. cerebri media" },
    { value: "pca", label: "A. cerebri posterior" },
    { value: "suca", label: "A. cerebelli superior" },
    { value: "aica", label: "A. cerebelli inferior anterior" },
    { value: "pica", label: "A. cerebelli inferior posterior" },
    { value: "ba", label: "A. basilaris" },
    { value: "va", label: "A. vertebralis" },
  ],
}
