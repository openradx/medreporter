import { Group } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import { NavbarCenter } from "../common/NavbarCenter"
import { PreviewSwitch } from "./PreviewSwitch"
import { TemplateDesigner } from "./TemplateDesigner"

export const NewTemplate = () => {
  const { t } = useSiteTranslation()
  const template = useAppSelector(selectTemplate)

  return (
    <>
      <NavbarCenter>
        <Group gap="xl">
          <span>{template.title || t("NewTemplate.navbarTitle")}</span>

          <PreviewSwitch />
        </Group>
      </NavbarCenter>
      <TemplateDesigner />
    </>
  )
}
