import { Alert, Tabs } from "@mantine/core"
import dynamic from "next/dynamic"
import { Loading } from "../common/Loading"

const CodeEditor = dynamic(() => import("./CodeEditor"), {
  loading: ({ isLoading, error }) => {
    if (isLoading) {
      return <Loading />
    }

    if (error) {
      return <Alert>{error.message}</Alert>
    }

    return null
  },
  ssr: false,
})

export const Editor = () => (
  <Tabs orientation="vertical" defaultValue="code-editor" sx={{ height: "100%" }}>
    <Tabs.List>
      <Tabs.Tab value="general">General</Tabs.Tab>
      <Tabs.Tab value="code-editor">Code Editor</Tabs.Tab>
      <Tabs.Tab value="preview">Preview</Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="preview">General</Tabs.Panel>

    <Tabs.Panel value="code-editor" pl="sm">
      <CodeEditor />
    </Tabs.Panel>

    <Tabs.Panel value="preview">Preview</Tabs.Panel>
  </Tabs>
)
