import { Divider, Group } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import { NavbarCenter } from "../common/NavbarCenter"
import { PreviewSwitch } from "./PreviewSwitch"
import { SyncingStateDisplay } from "./SyncingStateDisplay"
import { TemplateDesigner } from "./TemplateDesigner"
import { TemplatePropertiesButton } from "./TemplatePropertiesButton"

export const NewTemplate = () => {
  const { t } = useSiteTranslation()
  const template = useAppSelector(selectTemplate)

  return (
    <>
      <NavbarCenter>
        <Group gap="xl">
          <SyncingStateDisplay />
          <span>{template.title || t("NewTemplate.navbarTitle")}</span>
          <Divider orientation="vertical" size="sm" />
          <PreviewSwitch />
          <Divider orientation="vertical" size="sm" />
          <TemplatePropertiesButton />
        </Group>
      </NavbarCenter>
      <TemplateDesigner />
    </>
  )
}
