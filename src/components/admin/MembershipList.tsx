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
    <Stack>
      {!data?.memberships.length && <Text>{t("general.miscNoData")}</Text>}
      {data?.memberships.length && (
        <ScrollArea>
          <Table verticalSpacing="xs">
            <tbody>
              {data.memberships.map((membership) => (
                <tr key={membership.id}>
                  <td>{membership.user.username}</td>
                  <td>
                    <Group spacing={0} position="right">
                      <RemoveMembershipButton membership={membership} />
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
    </Stack>
  )
}
