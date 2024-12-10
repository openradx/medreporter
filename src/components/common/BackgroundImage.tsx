import { Overlay } from "@mantine/core"
import Image from "next/image"
import bgImage from "../../../public/exampleImage2.png"

export const BackgroundImage = () => (
  <>
    <Overlay color="#000" opacity={0.65} zIndex={1} />
    <Image
      src={bgImage}
      alt="Background"
      fill
      sizes="100vw"
      style={{ objectFit: "cover", zIndex: -1, opacity: 0.5 }}
    />
  </>
)
