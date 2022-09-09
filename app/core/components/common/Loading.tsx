import { Center, Loader, Overlay, Stack, Text } from "@mantine/core"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"

interface LoadingProps {
  message?: string
  show?: boolean
  transparent?: boolean
}

export const Loading = ({ message, show = true, transparent = false }: LoadingProps) => {
  const { t } = useSiteTranslation()
  message ||= t("Loading.messageLoading")

  const colorStyle = transparent
    ? {
        color: "text.primary",
        bgcolor: "transparent",
      }
    : {
        color: "#fff",
      }

  if (!show) {
    return null
  }

  return (
    <Overlay
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        ...colorStyle,
      }}
    >
      <Center>
        <Stack>
          <Loader variant="bars" />
          {message && <Text>{message}</Text>}
        </Stack>
      </Center>
    </Overlay>
  )
}
