import { usePaginatedQuery } from "@blitzjs/rpc"
import { Group, ScrollArea, Stack, Table, Text } from "@mantine/core"
import { MembershipRole } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getMemberships from "../queries/getMemberships"
import { RemoveMembershipButton } from "./RemoveMembershipButton"

interface MembershipListProps {
  instituteId: number
  role: MembershipRole
}

export const MembershipList = ({ instituteId, role }: MembershipListProps) => {
  const { t } = useSiteTranslation()
  const [{ memberships }] = usePaginatedQuery(getMemberships, {
    instituteId,
    role,
    orderBy: { user: { email: "asc" } },
  })

  return (
    <Stack>
      {memberships.length === 0 && <Text>{t("general.misc.noData")}</Text>}
      {memberships.length > 0 && (
        <ScrollArea>
          <Table verticalSpacing="xs">
            <tbody>
              {memberships.map((membership) => (
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
