import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { MultipleCheckboxInput } from "./MultipleCheckboxInput"

export default {
  title: "Inputs / MultipleCheckboxInput",
  component: MultipleCheckboxInput,
} as ComponentMeta<typeof MultipleCheckboxInput>

const Template: ComponentStory<typeof MultipleCheckboxInput> = ({ label, options }) => {
  const [value, setValue] = useState<string[]>([])

  return <MultipleCheckboxInput value={value} onChange={setValue} {...{ label, options }} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Brain lobe",
  options: [
    { value: "frontal", label: "Frontal lobe" },
    { value: "temporal", label: "Temporal lobe" },
    { value: "parietal", label: "Parietal lobe" },
    { value: "occipital", label: "Occipital lobe" },
  ],
}
