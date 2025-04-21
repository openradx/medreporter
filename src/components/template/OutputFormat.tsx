import { useLingui } from "@lingui/react/macro"
import { ActionIcon, Menu } from "@mantine/core"
import { SquareMenu as ReportFormatIcon, Check as CheckIcon } from "lucide-react"
import { selectOutputFormat, setOutputFormat } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"

export const OutputFormat = () => {
  const { t } = useLingui()
  const outputFormat = useAppSelector(selectOutputFormat)
  const dispatch = useAppDispatch()

  return (
    <Menu width={100}>
      <Menu.Target>
        <ActionIcon title={t`Change output format`} variant="default">
          <ReportFormatIcon size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => dispatch(setOutputFormat({ outputFormat: "html" }))}
          rightSection={outputFormat === "html" ? <CheckIcon /> : null}
        >
          {t`HTML`}
        </Menu.Item>
        <Menu.Item
          onClick={() => dispatch(setOutputFormat({ outputFormat: "plain" }))}
          rightSection={outputFormat === "plain" ? <CheckIcon /> : null}
        >
          {t`Text`}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
