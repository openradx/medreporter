import { Group, ScrollArea, Stack, Table, Text } from "@mantine/core"
import { MembershipRole } from "@prisma/client"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"
import { RemoveMembershipButton } from "./RemoveMembershipButton"

interface MembershipListProps {
  instituteId: string
  role: MembershipRole
}

export const MembershipList = ({ instituteId, role }: MembershipListProps) => {
  const { t } = useSiteTranslation()
  const { data, error, status } = trpc.admin.getMemberships.useQuery({ instituteId, role })

  if (status === "loading") {
    return <DataLoader />
  }

  if (status === "error") {
    return <QueryError message={error.message} />
  }

  return (
    <Stack h="90%" mih={0}>
      {!data?.memberships.length && <Text>{t("general.miscNoData")}</Text>}
      {data?.memberships.length && (
        <ScrollArea>
          <Table miw={500}>
            <Table.Tbody>
              {data.memberships.map((membership) => (
                <Table.Tr key={membership.id}>
                  <Table.Td>{membership.user.username}</Table.Td>
                  <Table.Td>
                    <Group gap={0} style={{ flexWrap: "nowrap", justifyContent: "flex-end" }}>
                      <RemoveMembershipButton membership={membership} />
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}
    </Stack>
  )
}
