import { Overlay } from "@mantine/core"
import Image from "next/image"
import { useEffect, useState } from "react"
import bgImage2 from "../../../public/exampleImage2.png"
import bgImage from "../../../public/exampleImage.png"
import classes from "./BackgroundImage.module.css"

export const BackgroundImage = () => {
  const images = [bgImage, bgImage2]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])
  return (
    <>
      <Overlay color="#000" opacity={0.65} zIndex={1} />
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt="Background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: -1 }}
          className={`${classes.background} ${
            index === currentImageIndex ? classes.visible : classes.hidden
          }`}
        />
      ))}
    </>
  )
}
