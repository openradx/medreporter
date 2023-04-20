import { Group, Footer as MantineFooter, Text } from "@mantine/core"
import { MdCopyright as CopyrightIcon } from "react-icons/md"

interface FooterProps {
  footerSize?: "small" | "tall"
}

export const Footer = ({ footerSize = "tall" }: FooterProps) => (
  <>
    <MantineFooter
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      height={footerSize === "tall" ? 60 : 40}
    >
      <Group px="xs">
        <CopyrightIcon size={20} color="grey" />
        <Text c="dimmed" fw={500} lineClamp={1}>
          2023 MedReporter. All Rights Reserved.{" "}
        </Text>
      </Group>
    </MantineFooter>
  </>
)
