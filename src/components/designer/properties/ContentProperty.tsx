import { Trans, useLingui } from "@lingui/react/macro"
import { Textarea, Group, SegmentedControl } from "@mantine/core"
import { Controller } from "react-hook-form"
import { ContentEditorButton } from "../contentEditor/ContentEditorButton"
import classes from "./ContentProperty.module.css"

export const ContentProperty = () => {
  const { t } = useLingui()

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
                <Trans>Content</Trans>
                <ContentEditorButton
                  modalTitle={t`Content`}
                  modalDescription={t`You can give a simple string or some javascript code to display the content.`}
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
                      { label: t`Code`, value: "code" },
                      { label: t`Text`, value: "text" },
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
