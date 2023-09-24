import { Modal, TextInput, Select, Button, Box, Title, MultiSelect } from "@mantine/core"
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
import { VisualEditor } from "./VisualEditor"

export const NewTemplate = () => {
  const [opened, { open, close }] = useDisclosure(false)

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
    <>
      <Box display="flex" mb={4} sx={{ justifyContent: "space-between" }}>
        <Title order={3} color="dimmed">
          Create new template
        </Title>
        <Button variant="outline" onClick={open}>
          Template properties
        </Button>
      </Box>
      <Modal opened={opened} onClose={close} title="New Template - Properties">
        <TextInput label="Name" />
        <Select
          label="Language"
          placeholder="Pick language"
          searchable
          nothingFound="No options"
          dropdownPosition="bottom"
          data={languageData}
          maxDropdownHeight={100}
        />
        <MultiSelect
          label="Tags"
          placeholder="Pick tags"
          searchable
          nothingFound="No options"
          dropdownPosition="bottom"
          data={tagsData}
          clearable
        />
        <Button onClick={close} mt={16}>
          Close
        </Button>
      </Modal>
      <VisualEditor />
    </>
  )
}
