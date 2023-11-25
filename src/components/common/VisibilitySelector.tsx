import { Select } from "@mantine/core"
import { Visibility } from "@prisma/client"
import { MdBusiness as InstituteIcon, MdOutlinePublic as PublicIcon } from "react-icons/md"
import { RiGitRepositoryPrivateLine as PrivateIcon } from "react-icons/ri"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

interface VisibilitySelectorProps {
  value: Visibility
  onChange: (visibility: Visibility) => void
}

export const VisibilitySelector = ({ value, onChange }: VisibilitySelectorProps) => {
  const { t } = useSiteTranslation()

  return (
    <Select
      label={t("VisibilitySelector.inputLabelVisibility")}
      leftSection={
        value === "PUBLIC" ? (
          <PublicIcon />
        ) : value === "INSTITUTE" ? (
          <InstituteIcon />
        ) : (
          <PrivateIcon />
        )
      }
      value={value}
      onChange={(v) => onChange(v as Visibility)}
      data={[
        { value: Visibility.PUBLIC, label: t("VisibilitySelector.optionPublic") },
        { value: Visibility.INSTITUTE, label: t("VisibilitySelector.optionInstitute") },
        { value: Visibility.PRIVATE, label: t("VisibilitySelector.optionPrivate") },
      ]}
    />
  )
}
