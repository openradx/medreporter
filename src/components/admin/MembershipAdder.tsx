import { ActionIcon, Loader, Select } from "@mantine/core"
import { MembershipRole } from "@prisma/client"
import { useState } from "react"
import { MdAddCircleOutline as AddIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"

interface MembershipAdderProps {
  instituteId: string
  role: MembershipRole
}

export const MembershipAdder = ({ instituteId, role }: MembershipAdderProps) => {
  const { t } = useSiteTranslation()
  const { data, status } = trpc.admin.getUsersForMembership.useQuery({ instituteId })
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const createMembership = trpc.admin.createMembership.useMutation()
  const utils = trpc.useContext()

  const handleAddMembership = async () => {
    if (!selectedUserId) return
    await createMembership.mutateAsync({ instituteId, userId: selectedUserId, role })
    setSelectedUserId(null)

    utils.admin.getMemberships.invalidate()
    utils.admin.getUsersForMembership.invalidate()
  }

  return (
    <Select
      icon={status === "loading" ? <Loader /> : undefined}
      label={t("MembershipAdder.inputLabelAddMember")}
      data={data?.users.map((user) => ({ value: user.id.toString(), label: user.username! })) ?? []}
      value={selectedUserId}
      onChange={setSelectedUserId}
      searchable
      onKeyPress={(event) => event.key === "Enter" && handleAddMembership()}
      rightSection={
        <ActionIcon
          title={t("MembershipAdder.buttonAddMember")}
          variant="filled"
          color="green"
          onClick={handleAddMembership}
        >
          <AddIcon size={20} />
        </ActionIcon>
      }
    />
  )
}