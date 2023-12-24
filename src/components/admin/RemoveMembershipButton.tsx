import { ActionIcon } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { Membership } from "@prisma/client"
import { MdDelete as RemoveIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"

interface RemoveMembershipButtonProps {
  membership: Membership
}

export const RemoveMembershipButton = ({ membership }: RemoveMembershipButtonProps) => {
  const { t } = useSiteTranslation()
  const deleteMembership = trpc.admin.deleteMembership.useMutation()
  const utils = trpc.useUtils()

  return (
    <ActionIcon
      title={t("RemoveMembershipButton.buttonRemoveMember")}
      variant="subtle"
      color="red"
      onClick={async () => {
        try {
          await deleteMembership.mutateAsync({ id: membership.id })
          utils.admin.getMemberships.invalidate()
        } catch (error) {
          if (error instanceof Error) {
            openModal({
              title: t("general.errorTitle"),
              children: error.message,
            })
          }
          throw error
        }
      }}
    >
      <RemoveIcon />
    </ActionIcon>
  )
}
