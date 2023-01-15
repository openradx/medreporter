import { Loader, Select, SelectItem } from "@mantine/core"
import { openModal } from "@mantine/modals"
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

  const options: SelectItem[] =
    ownMemberships.data?.map((membership) => {
      const instituteId = membership.institute.id
      const instituteName = membership.institute.name

      return { value: instituteId, label: instituteName }
    }) ?? []

  if (options.length) {
    options.unshift({ value: "", label: t("InstituteSwitcher.noInstituteOption") })
  }

  return (
    <Select
      label={t("InstituteSwitcher.label")}
      placeholder={!options.length ? t("InstituteSwitcher.noInstituteAvailable") : undefined}
      data={options}
      value={currentInstituteId === null ? "" : currentInstituteId}
      disabled={!ownMemberships.isSuccess}
      icon={
        ownMemberships.isLoading || updateCurrentInstitute.isLoading ? (
          <Loader size="sm" />
        ) : undefined
      }
      onChange={async (value) => {
        const newInstituteId = value === "" ? null : value
        updateCurrentInstitute.mutate(
          { instituteId: newInstituteId },
          {
            onSuccess: () => {
              reloadSession()
            },
            onError: (error) => {
              openModal({
                title: t("general.errorTitle"),
                children: error.message,
              })
            },
          }
        )
      }}
    />
  )
}
