import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { SingleSelectInput } from "./SingleSelectInput"

export default {
  title: "Inputs / SingleSelectInput",
  component: SingleSelectInput,
} as ComponentMeta<typeof SingleSelectInput>

const Template: ComponentStory<typeof SingleSelectInput> = ({
  label,

  options,
}) => {
  const [value, setValue] = useState<string | null>("")

  return (
    <InputLayout>
      <SingleSelectInput value={value} onChange={setValue} {...{ label, options }} />
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
