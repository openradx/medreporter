import SVG from "react-inlinesvg"

interface SvgPreviewProps {
  value: string
}

export const SvgPreview = ({ value }: SvgPreviewProps) => <SVG src={value} />
