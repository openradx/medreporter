import { ActionIcon, Menu } from "@mantine/core"
import { BsCardText as ReportFormatIcon } from "react-icons/bs"
import { TbCheck as CheckIcon } from "react-icons/tb"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { selectReportFormat, setReportFormat } from "../../state/displaySlice"
import { useAppDispatch, useAppSelector } from "../../state/store"

export const ReportFormat = () => {
  const { t } = useSiteTranslation()
  const reportFormat = useAppSelector(selectReportFormat)
  const dispatch = useAppDispatch()

  return (
    <Menu width={100}>
      <Menu.Target>
        <ActionIcon title={t("ReportFormat.button_title_format")} variant="default">
          <ReportFormatIcon />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => dispatch(setReportFormat({ reportFormat: "html" }))}
          rightSection={reportFormat === "html" ? <CheckIcon /> : null}
        >
          {t("ReportFormat.format_html")}
        </Menu.Item>
        <Menu.Item
          onClick={() => dispatch(setReportFormat({ reportFormat: "text" }))}
          rightSection={reportFormat === "text" ? <CheckIcon /> : null}
        >
          {t("ReportFormat.format_text")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
