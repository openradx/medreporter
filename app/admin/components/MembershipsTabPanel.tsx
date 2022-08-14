import { Tabs } from "@mantine/core"
import { Institute, MembershipRole } from "db"
import { SuspenseLoader } from "app/core/components/common/SuspenseLoader"
import { MembershipAdder } from "./MembershipAdder"
import { MembershipList } from "./MembershipList"

interface MembershipsTabPanelProps {
  tabValue: string
  institute: Institute
  role: MembershipRole
}

export const MembershipsTabPanel = ({ tabValue, institute, role }: MembershipsTabPanelProps) => (
  <Tabs.Panel value={tabValue}>
    <SuspenseLoader>
      <MembershipAdder instituteId={institute.id} role={role} />
      <MembershipList instituteId={institute.id} role={role} />
    </SuspenseLoader>
  </Tabs.Panel>
)
