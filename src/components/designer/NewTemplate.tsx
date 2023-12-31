import {
  Modal,
  TextInput,
  Select,
  Button,
  Title,
  MultiSelect,
  Flex,
  Stack,
  Switch,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import DE from "flag-icons/flags/4x3/de.svg"
import ES from "flag-icons/flags/4x3/es.svg"
import FR from "flag-icons/flags/4x3/fr.svg"
import GB from "flag-icons/flags/4x3/gb.svg"
import IT from "flag-icons/flags/4x3/it.svg"
import NL from "flag-icons/flags/4x3/nl.svg"
import PT from "flag-icons/flags/4x3/pt.svg"
import SE from "flag-icons/flags/4x3/se.svg"
import US from "flag-icons/flags/4x3/us.svg"
import { selectPreview, setPreview } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { TemplateDesigner } from "./TemplateDesigner"

export const NewTemplate = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const preview = useAppSelector(selectPreview)
  const dispatch = useAppDispatch()

  const languageData = [
    { value: "gb", label: "English (UK)", image: GB },
    { value: "us", label: "English (US)", image: US },
    { value: "de", label: "German", image: DE },
    { value: "es", label: "Spanish", image: ES },
    { value: "fr", label: "French", image: FR },
    { value: "it", label: "Italian", image: IT },
    { value: "nl", label: "Dutch", image: NL },
    { value: "pt", label: "Portuguese", image: PT },
    { value: "sv", label: "Swedish", image: SE },
  ]

  const tagsData = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ]

  return (
    <Stack h="100%">
      <Flex mb={4} justify="space-between">
        <Title order={3} c="dimmed">
          Create new template
        </Title>
        <Button variant="outline" onClick={open}>
          Template properties
        </Button>
        <Switch
          label="Preview"
          checked={preview}
          onChange={(event) => dispatch(setPreview(event.currentTarget.checked))}
        />
      </Flex>
      <Modal opened={opened} onClose={close} title="New Template - Properties">
        <TextInput label="Name" />
        <Select
          label="Language"
          placeholder="Pick language"
          searchable
          nothingFoundMessage="No options"
          data={languageData}
          maxDropdownHeight={100}
        />
        <MultiSelect
          label="Tags"
          placeholder="Pick tags"
          searchable
          nothingFoundMessage="No options"
          data={tagsData}
          clearable
        />
        <Button onClick={close} mt={16}>
          Close
        </Button>
      </Modal>
      <TemplateDesigner />
    </Stack>
  )
}
