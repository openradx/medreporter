import { Button, Group, Modal, Stack, Tabs, Text } from "@mantine/core"
import { Institute, MembershipRole } from "@prisma/client"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
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
  const { t } = useSiteTranslation()

  return (
    <Modal
      size="lg"
      title={
        <Stack>
          <Text>{institute.name}</Text>
        </Stack>
      }
      opened={opened}
      onClose={onClose}
    >
      <Stack>
        <Tabs defaultValue="members">
          <Tabs.List aria-label="Memberships">
            <Tabs.Tab value="members">{t("ManageMembershipsModal.tabTitleMembers")}</Tabs.Tab>
            <Tabs.Tab value="admins">{t("ManageMembershipsModal.tabTitleAdmins")}</Tabs.Tab>
            <Tabs.Tab value="owners">{t("ManageMembershipsModal.tabTitleOwners")}</Tabs.Tab>
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
          <Button variant="default" onClick={onClose}>
            {t("general.buttonClose")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
