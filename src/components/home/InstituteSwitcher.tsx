import { Group, Loader, Select, Text } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { forwardRef, ReactElement } from "react"
import { BsPersonSquare as NoInstituteIcon } from "react-icons/bs"
import { MdBusiness as InstituteIcon } from "react-icons/md"
import { useAuthenticatedUser } from "~/hooks/useAuthenticatedUser"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { reloadSession } from "~/utils/session"
import { trpc } from "~/utils/trpc"

export const InstituteSwitcher = () => {
  const { t } = useSiteTranslation()
  const user = useAuthenticatedUser()
  const { currentInstituteId } = user
  const ownMemberships = trpc.profile.getOwnMemberships.useQuery()
  const updateCurrentInstitute = trpc.profile.updateCurrentInstitute.useMutation()
  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: ReactElement
    label: string
    value: string
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          {image} <Text size="sm">{label}</Text>
        </Group>
      </div>
    )
  )

  const options: ItemProps[] =
    ownMemberships.data?.map((membership) => {
      const instituteId = membership.institute.id
      const instituteName = membership.institute.name

      return { value: instituteId, label: instituteName, image: <InstituteIcon /> }
    }) ?? []

  if (options.length) {
    options.unshift({
      value: "",
      label: t("InstituteSwitcher.noInstituteOption"),
      image: <NoInstituteIcon />,
    })
  }

  return (
    <Select
      label={t("InstituteSwitcher.label")}
      searchable
      clearable
      placeholder={!options.length ? t("InstituteSwitcher.noInstituteAvailable") : undefined}
      data={options}
      itemComponent={SelectItem}
      value={currentInstituteId === null ? "" : currentInstituteId}
      disabled={!ownMemberships.isSuccess}
      icon={
        ownMemberships.isLoading || updateCurrentInstitute.isLoading ? (
          <Loader size="sm" />
        ) : currentInstituteId ? (
          <InstituteIcon size={20} />
        ) : (
          <NoInstituteIcon size={20} />
        )
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
