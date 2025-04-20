import { Trans, useLingui } from "@lingui/react/macro"
import {
  Combobox,
  ComboboxItem,
  ComboboxOption,
  InputBase,
  Loader,
  useCombobox,
} from "@mantine/core"
import { openModal } from "@mantine/modals"
import { SquareUser as IndividualIcon, Building2 as InstituteIcon } from "lucide-react"
import { useAuthenticatedUser } from "~/hooks/useAuthenticatedUser"
import { reloadSession } from "~/utils/session"
import { trpc } from "~/utils/trpc"

export const InstituteSwitcher = () => {
  const { t } = useLingui()
  const user = useAuthenticatedUser()
  const { currentInstituteId } = user
  const ownMemberships = trpc.profile.getOwnMemberships.useQuery()
  const updateCurrentInstitute = trpc.profile.updateCurrentInstitute.useMutation()

  const options: ComboboxItem[] =
    ownMemberships.data?.map((membership) => {
      const instituteId = membership.institute.id
      const instituteName = membership.institute.name
      return { value: instituteId, label: instituteName }
    }) ?? []

  const currentInstituteName = options.find((option) => option.value === currentInstituteId)?.label

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  return (
    <Combobox
      store={combobox}
      disabled={!ownMemberships.isSuccess}
      onOptionSubmit={async (value) => {
        const newInstituteId = value === "" ? null : value
        updateCurrentInstitute.mutate(
          { instituteId: newInstituteId },
          {
            onSuccess: () => {
              reloadSession()
            },
            onError: (error) => {
              openModal({
                title: t`An error occurred.`,
                children: error.message,
              })
            },
          }
        )
        combobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          pointer
          label={t`Current institute`}
          leftSection={
            ownMemberships.isPending || updateCurrentInstitute.isPending ? (
              <Loader type="bars" size="sm" />
            ) : currentInstituteId ? (
              <InstituteIcon size={20} />
            ) : (
              <IndividualIcon size={20} />
            )
          }
          rightSection={<Combobox.Chevron />}
          value={currentInstituteId ?? ""}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        >
          {currentInstituteName ?? t`Individual`}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Combobox.Group label={t`Individual`}>
            <Combobox.Option value="" key="">
              <Trans>Individual</Trans>
            </Combobox.Option>
          </Combobox.Group>
          <Combobox.Group label={t`Institutes`}>
            {options.length > 0 &&
              options.map((option) => (
                <ComboboxOption key={option.value} value={option.value}>
                  {option.label}
                </ComboboxOption>
              ))}
            {options.length === 0 && (
              <ComboboxOption value="none" key="none">
                <Trans>No institute available</Trans>
              </ComboboxOption>
            )}
          </Combobox.Group>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
