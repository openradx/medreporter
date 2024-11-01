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

      setInterpreter(new ScriptInterpreter(runtime))
    }
    initInterpreter()

    return () => {
      interpreter?.dispose()
    }
  }, [])

  if (!interpreter) {
    return null
  }

  return <InterpreterContextProvider value={interpreter}>{children}</InterpreterContextProvider>
}
