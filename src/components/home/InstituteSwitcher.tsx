import { Loader, Select } from "@mantine/core"
import { useAuthenticatedUser } from "~/hooks/useAuthenticatedUser"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { reloadSession } from "~/utils/session"
import { trpc } from "~/utils/trpc"

export const InstituteSwitcher = () => {
  const { t } = useSiteTranslation()
  const user = useAuthenticatedUser()
  const { currentInstituteId } = user
  const ownMemberships = trpc.common.getOwnMemberships.useQuery()
  const updateCurrentInstitute = trpc.common.updateCurrentInstitute.useMutation()

  // TODO: Option to clear institute
  const options =
    ownMemberships.data?.map((membership) => {
      const instituteId = membership.institute.id
      const instituteName = membership.institute.name

      return { value: instituteId, label: instituteName }
    }) ?? []

  return (
    <Select
      label={t("InstituteSwitcher.label")}
      data={options}
      value={currentInstituteId}
      disabled={!ownMemberships.isSuccess}
      icon={ownMemberships.isLoading ? <Loader size="sm" /> : undefined}
      onChange={async (newInstituteId) => {
        await updateCurrentInstitute.mutateAsync({ instituteId: newInstituteId })
        reloadSession()
      }}
    />
  )
}
