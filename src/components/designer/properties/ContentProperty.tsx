import { Textarea, Group, SegmentedControl } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ContentEditorButton } from "../contentEditor/ContentEditorButton"
import classes from "./ContentProperty.module.css"

export const ContentProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <Controller
      name="content.contentValue"
      render={({
        field: { value: contentValue, onChange: onChangeContentValue },
        fieldState: { error },
      }) => (
        <Textarea
          label={
            <Group gap="lg" align="center" justify="space-between">
              <Group gap="xs">
                {t("ContentProperty.label")}
                <ContentEditorButton
                  modalTitle={t("ContentProperty.modalTitle")}
                  modalDescription={t("ContentProperty.modalDescription")}
                  value={contentValue}
                  onChange={onChangeContentValue}
                />
              </Group>
              <Controller
                name="content.contentType"
                render={({ field: { value: contentType, onChange: onChangeContentType } }) => (
                  <SegmentedControl
                    size="xs"
                    data={[
                      { label: t("ContentProperty.labelCode"), value: "code" },
                      { label: t("ContentProperty.labelText"), value: "text" },
                    ]}
                    value={contentType}
                    onChange={onChangeContentType}
                  />
                )}
              />
            </Group>
          }
          value={contentValue}
          onChange={onChangeContentValue}
          error={error?.message}
          classNames={{ label: classes.label }}
        />
      )}
    />
  )
}
