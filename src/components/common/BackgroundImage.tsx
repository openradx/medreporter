import { Overlay } from "@mantine/core"
import Image from "next/image"
import { useEffect, useState } from "react"
import bgImage1 from "../../../public/exampleImage1.png"
import bgImage2 from "../../../public/exampleImage2.png"
import bgImage3 from "../../../public/exampleImage3.png"
import bgImage4 from "../../../public/exampleImage4.png"
import classes from "./BackgroundImage.module.css"

export const BackgroundImage = () => {
  const images = [bgImage1, bgImage2, bgImage3, bgImage4]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])
  return (
    <>
      <Overlay className={classes.overlay} />
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
