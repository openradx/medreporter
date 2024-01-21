import Markdown from "react-markdown"

interface MarkdownPreviewProps {
  value: string
}

export const MarkdownPreview = ({ value }: MarkdownPreviewProps) => <Markdown>{value}</Markdown>
