import { ComponentProps, forwardRef, Ref } from "react"
import { useWatch } from "react-hook-form"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { LanguageSelector } from "./LanguageSelector"

export const DraftLanguageSelector = forwardRef(
  (props: ComponentProps<typeof LanguageSelector>, ref: Ref<HTMLInputElement>) => {
    const { t } = useSiteTranslation()
    const multilingual = useWatch({ name: "multilingual" })

    return (
      <LanguageSelector
        {...props}
        ref={ref}
        label={multilingual ? t("DraftLanguageSelector.inputLabelLanguage") : undefined}
      />
    )
  }
)
