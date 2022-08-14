import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import { Autocomplete } from "@mantine/core"
import { MembershipRole } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import createMembership from "../mutations/createMembership"
import getMemberships from "../queries/getMemberships"
import getUsersForMembership from "../queries/getUsersForMembership"

interface MembershipAdderProps {
  instituteId: number
  role: MembershipRole
}

export const MembershipAdder = ({ instituteId, role }: MembershipAdderProps) => {
  const { t } = useSiteTranslation()
  const [{ users }] = useQuery(getUsersForMembership, {
    instituteId,
    orderBy: { username: "asc" },
  })
  const [createMembershipMutation] = useMutation(createMembership)

  return (
    <Autocomplete
      label={t("MembershipAdder.label")}
      data={users.map((user) => ({ value: user.username, id: user.id }))}
      onItemSubmit={async (item) => {
        const userId = item.id as number
        await createMembershipMutation({ instituteId, userId, role })
        invalidateQuery(getMemberships)
        invalidateQuery(getUsersForMembership)
      }}
    />
  )
}
