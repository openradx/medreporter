import { getQuickJS } from "quickjs-emscripten"
import { ReactNode, useEffect, useState } from "react"
import { InterpreterContextProvider } from "~/contexts/InterpreterContext"
import { ScriptInterpreter } from "~/utils/interpreter"

interface InterpreterProviderProps {
  children: ReactNode
}

export const InterpreterProvider = ({ children }: InterpreterProviderProps) => {
  const [interpreter, setInterpreter] = useState<ScriptInterpreter>()

  useEffect(() => {
    const initInterpreter = async () => {
      const QuickJS = await getQuickJS()
      const runtime = QuickJS.newRuntime()
      // "Should be enough for everyone" -- attributed to B. Gates
      runtime.setMemoryLimit(1024 * 640)
      // Limit stack size
      runtime.setMaxStackSize(1024 * 320)
      // Interrupt computation after 1024 calls to the interrupt handler
      let interruptCycles = 0
      runtime.setInterruptHandler(() => ++interruptCycles > 1024)

      setInterpreter(new ScriptInterpreter(runtime))
    }
    initInterpreter()

    return () => {
      interpreter?.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!interpreter) {
    return null
  }

  return <InterpreterContextProvider value={interpreter}>{children}</InterpreterContextProvider>
}
