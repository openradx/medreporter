import { Select } from "@mantine/core"
import { Visibility } from "@prisma/client"
import { ComponentProps, forwardRef } from "react"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"

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
        data={[
          { value: Visibility.PUBLIC, label: t("VisibilitySelector.optionPublic") },
          { value: Visibility.INSTITUTE, label: t("VisibilitySelector.optionInstitute") },
          { value: Visibility.PRIVATE, label: t("VisibilitySelector.optionPrivate") },
        ]}
      />
    )
  }
)
