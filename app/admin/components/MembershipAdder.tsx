import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import { ActionIcon, Select } from "@mantine/core"
import { useState } from "react"
import { MdAddCircleOutline as AddIcon } from "react-icons/md"
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
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [createMembershipMutation] = useMutation(createMembership)

  const handleAddMembership = async () => {
    if (!selectedUserId) return
    const userId = parseInt(selectedUserId, 10)
    await createMembershipMutation({ instituteId, userId, role })
    setSelectedUserId(null)
    invalidateQuery(getMemberships, {})
    invalidateQuery(getUsersForMembership, {})
  }

  return (
    <Select
      label={t("MembershipAdder.label")}
      data={users.map((user) => ({ value: user.id.toString(), label: user.username }))}
      value={selectedUserId}
      onChange={setSelectedUserId}
      searchable
      onKeyPress={(event) => event.key === "Enter" && handleAddMembership()}
      rightSection={
        <ActionIcon variant="filled" color="green" onClick={handleAddMembership}>
          <AddIcon size={20} />
        </ActionIcon>
      }
    />
  )
}
