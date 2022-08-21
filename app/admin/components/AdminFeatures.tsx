import { Routes } from "@blitzjs/next"
import { Grid, Text } from "@mantine/core"
import { MembershipRole, UserRole } from "@prisma/client"
import { RouteUrlObject } from "blitz"
import { ReactNode } from "react"
import { MdBusiness as InstituteIcon, MdPeople as UserIcon } from "react-icons/md"
import { useAppSession } from "app/core/hooks/useAppSession"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { AdminFeatureCard } from "./AdminFeatureCard"

interface AdminFeature {
  url: RouteUrlObject
  icon: ReactNode
  title: string
  description: string
}

export const AdminFeatures = () => {
  const { t } = useSiteTranslation()
  const session = useAppSession()

  const isSuperadmin = session.roles?.includes(UserRole.SUPERADMIN) ?? false
  const canManageInstitutes =
    (session.roles?.includes(MembershipRole.OWNER) ||
      session.roles?.includes(MembershipRole.ADMIN)) ??
    false

  const features: AdminFeature[] = []

  if (isSuperadmin) {
    features.push({
      url: Routes.ManageUsersPage(),
      icon: <UserIcon size={18} />,
      title: t("AdminFeatures.manageUsersTitle"),
      description: t("AdminFeatures.manageUsersDescription"),
    })
  }

  if (isSuperadmin || canManageInstitutes) {
    features.push({
      url: Routes.ManageInstitutesPage(),
      icon: <InstituteIcon size={18} />,
      title: t("AdminFeatures.manageInstitutesTitle"),
      description: t("AdminFeatures.manageInstitutesDescription"),
    })
  }

  return (
    <>
      {features.length === 0 && <Text>{t("AdminFeatures.noAdminRights")}</Text>}
      {features.length > 0 && (
        <Grid>
          {features.map((feature) => (
            <Grid.Col key={feature.url.pathname} sm={12} md={6} lg={4}>
              <AdminFeatureCard
                url={feature.url}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </>
  )
}
