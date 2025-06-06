import { Trans } from "@lingui/react/macro"
import { Button } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { MeasurementsDefaultModal } from "./MeasurementsDefaultModal"

export const MeasurementsDefaultButton = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button w="100%" variant="default" onClick={open}>
        <Trans>Open editor</Trans>
      </Button>
      {opened && <MeasurementsDefaultModal opened={opened} onClose={close} />}
    </>
  )
}
