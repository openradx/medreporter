import { Box, Button, Group, Modal, Stack, Tabs, Text } from "@mantine/core"
import { Institute, MembershipRole } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
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
    <Tabs>
      <Modal
        title={
          <Stack>
            <Text>{institute.name}</Text>
            <Tabs.List aria-label="Memberships">
              <Tabs.Tab value="members">{t("ManageMembershipsModal.members")}</Tabs.Tab>
              <Tabs.Tab value="admins">{t("ManageMembershipsModal.admins")}</Tabs.Tab>
              <Tabs.Tab value="owners">{t("ManageMembershipsModal.owners")}</Tabs.Tab>
            </Tabs.List>
          </Stack>
        }
        opened={opened}
        onClose={onClose}
      >
        <Stack>
          <Box id="manage-memberships-emails">
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
          </Box>
          <Group position="right">
            <Button variant="default" onClick={onClose}>
              {t("general.buttons.close")}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Tabs>
  )
}
