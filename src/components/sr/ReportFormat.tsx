import { ActionIcon, Menu } from "@mantine/core"
import { BsCardText as ReportFormatIcon } from "react-icons/bs"
import { TbCheck as CheckIcon } from "react-icons/tb"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectReportFormat, setReportFormat } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"

export const ReportFormat = () => {
  const { t } = useSiteTranslation()
  const reportFormat = useAppSelector(selectReportFormat)
  const dispatch = useAppDispatch()

  return (
    <Menu width={100}>
      <Menu.Target>
        <ActionIcon title={t("ReportFormat.buttonFormat")} variant="default">
          <ReportFormatIcon />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => dispatch(setReportFormat({ reportFormat: "html" }))}
          rightSection={reportFormat === "html" ? <CheckIcon /> : null}
        >
          {t("ReportFormat.formatHtml")}
        </Menu.Item>
        <Menu.Item
          onClick={() => dispatch(setReportFormat({ reportFormat: "text" }))}
          rightSection={reportFormat === "text" ? <CheckIcon /> : null}
        >
          {t("ReportFormat.formatText")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
