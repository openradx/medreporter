import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { CodeMirror } from "./CodeMirror"

const meta: Meta<typeof CodeMirror> = {
  title: "Misc / CodeMirror",
  component: CodeMirror,
}

export default meta
type Story = StoryObj<typeof CodeMirror>

const CodeMirrorWithState = ({ theme }: ComponentProps<typeof CodeMirror>) => {
  const [value, setValue] = useState<string>("")
  return <CodeMirror theme={theme} extensions={[]} value={value} onChange={setValue} />
}

const Template: Story = {
  render: (props) => <CodeMirrorWithState {...props} />,
}

export const JavascriptCodeMirror: Story = {
  ...Template,
  args: {
    theme: "dark",
  },
}
