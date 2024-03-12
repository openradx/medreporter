import { ActionIcon, Menu } from "@mantine/core"
import { SquareMenu as ReportFormatIcon, Check as CheckIcon } from "lucide-react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectOutputFormat, setOutputFormat } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"

export const OutputFormat = () => {
  const { t } = useSiteTranslation()
  const outputFormat = useAppSelector(selectOutputFormat)
  const dispatch = useAppDispatch()

  return (
    <Menu width={100}>
      <Menu.Target>
        <ActionIcon title={t("OutputFormat.buttonFormat")} variant="default">
          <ReportFormatIcon size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => dispatch(setOutputFormat({ outputFormat: "html" }))}
          rightSection={outputFormat === "html" ? <CheckIcon /> : null}
        >
          {t("OutputFormat.formatHtml")}
        </Menu.Item>
        <Menu.Item
          onClick={() => dispatch(setOutputFormat({ outputFormat: "plain" }))}
          rightSection={outputFormat === "plain" ? <CheckIcon /> : null}
        >
          {t("OutputFormat.formatText")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
