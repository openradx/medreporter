import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { Membership } from "@prisma/client"
import { Trash2 as RemoveIcon } from "lucide-react"
import { trpc } from "~/utils/trpc"

interface RemoveMembershipButtonProps {
  membership: Membership
}

export const RemoveMembershipButton = ({ membership }: RemoveMembershipButtonProps) => {
  const { t } = useLingui()
  const deleteMembership = trpc.admin.deleteMembership.useMutation()
  const utils = trpc.useUtils()

  return (
    <ActionIcon
      title={t`Remove membership`}
      variant="subtle"
      color="red"
      onClick={async () => {
        try {
          await deleteMembership.mutateAsync({ id: membership.id })
          utils.admin.getMemberships.invalidate()
        } catch (error) {
          if (error instanceof Error) {
            openModal({
              title: t`An error occurred.`,
              children: error.message,
            })
          }
          throw error
        }
      }}
    >
      <RemoveIcon size={18} />
    </ActionIcon>
  )
}
