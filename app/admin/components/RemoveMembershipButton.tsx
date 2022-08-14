import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { ActionIcon } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { MdDelete as RemoveIcon } from "react-icons/md"
import { Membership } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import deleteMembership from "../mutations/deleteMembership"
import getInstituteUsers from "../queries/getMemberships"

interface RemoveMembershipButtonProps {
  membership: Membership
}

export const RemoveMembershipButton = ({ membership }: RemoveMembershipButtonProps) => {
  const { t } = useSiteTranslation()
  const [deleteMembershipMutation] = useMutation(deleteMembership)

  return (
    <ActionIcon
      color="red"
      onClick={async () => {
        try {
          await deleteMembershipMutation({ id: membership.id })
          invalidateQuery(getInstituteUsers)
        } catch (error) {
          const { message } = error as Error
          openModal({
            title: t("general.errors.errorTitle"),
            children: message,
          })
        }
      }}
    >
      <RemoveIcon />
    </ActionIcon>
  )
}
