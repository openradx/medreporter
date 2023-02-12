import { ComponentProps, forwardRef, Ref } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { LanguageSelector } from "./LanguageSelector"

export const DraftLanguageSelector = forwardRef(
  (props: ComponentProps<typeof LanguageSelector>, ref: Ref<HTMLInputElement>) => {
    const { t } = useSiteTranslation()

    return (
      <LanguageSelector
        {...props}
        ref={ref}
        label={t("DraftLanguageSelector.inputLabelLanguage")}
      />
    )
  }
)
