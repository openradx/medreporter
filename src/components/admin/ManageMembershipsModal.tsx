import { Trans, useLingui } from "@lingui/react/macro"
import { Button, Group, Modal, Stack, Tabs, Text } from "@mantine/core"
import { Institute, MembershipRole } from "@prisma/client"
import { MembershipsTabPanel } from "./MembershipsTabPanel"

interface ManageMembershipsModalProps {
  institute: Institute
  opened: boolean
  onClose: () => void
}

export const ManageMembershipsModal = ({
  institute,
  opened,
  onClose,
}: ManageMembershipsModalProps) => {
  const { t } = useLingui()

  return (
    <Modal size="lg" title={<Text>{institute.name}</Text>} opened={opened} onClose={onClose}>
      <Stack>
        <Tabs defaultValue="members">
          <Tabs.List aria-label="Memberships">
            <Tabs.Tab value="members">{t`Members`}</Tabs.Tab>
            <Tabs.Tab value="admins">{t`Admins`}</Tabs.Tab>
            <Tabs.Tab value="owners">{t`Owners`}</Tabs.Tab>
          </Tabs.List>
          <MembershipsTabPanel
            tabValue="members"
            institute={institute}
            role={MembershipRole.MEMBER}
          />
          <MembershipsTabPanel
            tabValue="admins"
            institute={institute}
            role={MembershipRole.ADMIN}
          />
          <MembershipsTabPanel
            tabValue="owners"
            institute={institute}
            role={MembershipRole.OWNER}
          />
        </Tabs>
        <Group justify="flex-end">
          <Button variant="outline" onClick={onClose}>
            <Trans>Close</Trans>
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
