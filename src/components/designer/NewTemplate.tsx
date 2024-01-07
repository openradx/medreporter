import { Group } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NavbarCenter } from "../common/NavbarCenter"
import { PreviewSwitch } from "./PreviewSwitch"
import { TemplateDesigner } from "./TemplateDesigner"

export const NewTemplate = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <NavbarCenter>
        <Group gap="xl">
          <span>{t("NewTemplate.navbarTitle")}</span>
          <PreviewSwitch />
        </Group>
      </NavbarCenter>
      <TemplateDesigner />
    </>
  )
}
