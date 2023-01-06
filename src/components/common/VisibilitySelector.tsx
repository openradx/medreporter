import { Select } from "@mantine/core"
import { Visibility } from "@prisma/client"
import { ComponentProps, forwardRef } from "react"
import { MdBusiness as InstituteIcon, MdOutlinePublic as PublicIcon } from "react-icons/md"
import { RiGitRepositoryPrivateLine as PrivateIcon } from "react-icons/ri"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

interface VisibilitySelectorProps extends Omit<ComponentProps<typeof Select>, "data"> {
  value: Visibility
  onChange: (visibility: Visibility) => void
}

export const VisibilitySelector = forwardRef<HTMLInputElement, VisibilitySelectorProps>(
  (props, ref) => {
    const { t } = useSiteTranslation()

    return (
      <Select
        {...props}
        ref={ref}
        label={t("VisibilitySelector.inputLabelVisibility")}
        icon={
          props.value === "PUBLIC" ? (
            <PublicIcon />
          ) : props.value === "INSTITUTE" ? (
            <InstituteIcon />
          ) : (
            <PrivateIcon />
          )
        }
        data={[
          { value: Visibility.PUBLIC, label: t("VisibilitySelector.optionPublic") },
          { value: Visibility.INSTITUTE, label: t("VisibilitySelector.optionInstitute") },
          { value: Visibility.PRIVATE, label: t("VisibilitySelector.optionPrivate") },
        ]}
      />
    )
  }
)
