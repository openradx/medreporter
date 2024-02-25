import { Modal } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"
import { MeasurementsInput } from "~/components/inputs/MeasurementsInput"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MeasurementsData } from "~/schemas/structure"

interface MeasurementsDefaultModalProps {
  opened: boolean
  onClose: () => void
}

export const MeasurementsDefaultModal = ({ opened, onClose }: MeasurementsDefaultModalProps) => {
  const { t } = useSiteTranslation()

  const { control } = useFormContext<{ default: MeasurementsData }>()

  return (
    <Modal
      size="xl"
      opened={opened}
      onClose={onClose}
      title={t("MeasurementsDefaultModal.modalTitle")}
    >
      <Controller
        control={control}
        name="default"
        render={({ field, fieldState }) => (
          <>
            <MeasurementsInput value={field.value} onChange={field.onChange} />
            <p>{fieldState.error?.message}</p>
          </>
        )}
      />
    </Modal>
  )
}
