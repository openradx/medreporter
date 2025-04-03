import { ActionIcon, Loader, Select } from "@mantine/core"
import { MembershipRole } from "@prisma/client"
import { CirclePlus as AddIcon } from "lucide-react"
import { useState } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"

interface MembershipAdderProps {
  instituteId: string
  role: MembershipRole
}

export const MembershipAdder = ({ instituteId, role }: MembershipAdderProps) => {
  const { t } = useSiteTranslation()
  const { isPending, data } = trpc.admin.getUsersForMembership.useQuery({ instituteId })
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const createMembership = trpc.admin.createMembership.useMutation()
  const utils = trpc.useUtils()

  const handleAddMembership = async () => {
    if (!selectedUserId) return
    await createMembership.mutateAsync({ instituteId, userId: selectedUserId, role })
    setSelectedUserId(null)

    utils.admin.getMemberships.invalidate()
    utils.admin.getUsersForMembership.invalidate()
  }

  return (
    <Select
      leftSection={isPending ? <Loader type="bars" size="sm" /> : undefined}
      label={t("MembershipAdder.inputLabelAddMember")}
      data={data?.users.map((user) => ({ value: user.id.toString(), label: user.username! })) ?? []}
      value={selectedUserId}
      onChange={setSelectedUserId}
      searchable
      onKeyDown={(event) => event.key === "Enter" && handleAddMembership()}
      rightSectionPointerEvents="all"
      rightSection={
        <ActionIcon
          title={t("MembershipAdder.buttonAddMember")}
          variant="transparent"
          color="green"
          onClick={handleAddMembership}
        >
          <AddIcon size={20} />
        </ActionIcon>
      }
    />
  )
}
