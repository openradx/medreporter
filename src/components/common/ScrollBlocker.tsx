import { ReactNode, useEffect, useRef } from "react"

interface ScrollBlockerProps {
  focus: boolean
  children: ReactNode
}

export const ScrollBlocker = ({ focus, children }: ScrollBlockerProps) => {
  const divEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const divElRef = divEl.current!
    const preventDefault = (event: WheelEvent) => {
      if (focus) {
        event.preventDefault()
      }
    }
    divElRef.addEventListener("wheel", preventDefault, { passive: false })
    return () => {
      divElRef.removeEventListener("wheel", preventDefault)
    }
  }, [focus])

  return <div ref={divEl}>{children}</div>
}
