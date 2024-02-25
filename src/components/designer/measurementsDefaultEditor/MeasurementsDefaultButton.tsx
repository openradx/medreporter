import { Button } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MeasurementsDefaultModal } from "./MeasurementsDefaultModal"

export const MeasurementsDefaultButton = () => {
  const { t } = useSiteTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button w="100%" variant="default" onClick={open}>
        {t("MeasurementsDefaultButton.label")}
      </Button>
      {opened && <MeasurementsDefaultModal opened={opened} onClose={close} />}
    </>
  )
}
