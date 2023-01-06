import { Tabs } from "@mantine/core"
import { Institute, MembershipRole } from "@prisma/client"
import { MembershipAdder } from "./MembershipAdder"
import { MembershipList } from "./MembershipList"

interface MembershipsTabPanelProps {
  tabValue: string
  institute: Institute
  role: MembershipRole
}

export const MembershipsTabPanel = ({ tabValue, institute, role }: MembershipsTabPanelProps) => (
  <Tabs.Panel value={tabValue} pt={4}>
    <MembershipAdder instituteId={institute.id} role={role} />
    <MembershipList instituteId={institute.id} role={role} />
  </Tabs.Panel>
)
