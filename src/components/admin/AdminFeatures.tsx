import { Grid, Text } from "@mantine/core"
import { MembershipRole, UserRole } from "@prisma/client"
import { Building2 as InstituteIcon, Users as UserIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { Route } from "nextjs-routes"
import { ReactNode } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { AdminFeatureCard } from "./AdminFeatureCard"

interface AdminFeature {
  route: Route
  icon: ReactNode
  title: string
  description: string
}

export const AdminFeatures = () => {
  const { t } = useSiteTranslation()
  const session = useSession()

  const roles = session.data?.user.roles
  const isSuperuser = roles?.includes(UserRole.SUPERUSER) ?? false
  const canManageInstitutes =
    (roles?.includes(MembershipRole.OWNER) || roles?.includes(MembershipRole.ADMIN)) ?? false

  const features: AdminFeature[] = []

  if (isSuperuser) {
    features.push({
      route: { pathname: "/admin/manage-users" },
      icon: <UserIcon size={18} />,
      title: t("AdminFeatures.titleManageUsers"),
      description: t("AdminFeatures.descriptionManageUsers"),
    })
  }

  if (isSuperuser || canManageInstitutes) {
    features.push({
      route: { pathname: "/admin/manage-institutes" },
      icon: <InstituteIcon size={18} />,
      title: t("AdminFeatures.titleManageInstitutes"),
      description: t("AdminFeatures.descriptionManageInstitutes"),
    })
  }

  return (
    <>
      {features.length === 0 && <Text>{t("AdminFeatures.messageNoAdminRights")}</Text>}
      {features.length > 0 && (
        <Grid>
          {features.map((feature) => (
            <Grid.Col key={feature.route.pathname} span={{ sm: 12, md: 6, lg: 4 }}>
              <AdminFeatureCard
                route={feature.route}
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
