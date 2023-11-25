import {
  Combobox,
  ComboboxItem,
  ComboboxOption,
  InputBase,
  Loader,
  useCombobox,
} from "@mantine/core"
import { openModal } from "@mantine/modals"
import { BsPersonSquare as IndividualIcon } from "react-icons/bs"
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
                title: t("general.errorTitle"),
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
          label={t("InstituteSwitcher.inputLabel")}
          leftSection={
            ownMemberships.isLoading || updateCurrentInstitute.isLoading ? (
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
          {currentInstituteName ?? t("InstituteSwitcher.optionIndividual")}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Combobox.Group label={t("InstituteSwitcher.groupIndividual")}>
            <Combobox.Option value="" key="">
              {t("InstituteSwitcher.optionIndividual")}
            </Combobox.Option>
          </Combobox.Group>
          <Combobox.Group label={t("InstituteSwitcher.groupInstitutes")}>
            {options.length > 0 &&
              options.map((option) => (
                <ComboboxOption key={option.value} value={option.value}>
                  {option.label}
                </ComboboxOption>
              ))}
            {options.length === 0 && (
              <ComboboxOption value="none" key="none">
                {t("InstituteSwitcher.optionNoInstituteAvailable")}
              </ComboboxOption>
            )}
          </Combobox.Group>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
