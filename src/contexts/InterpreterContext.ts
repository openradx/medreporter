import { createRequiredContext } from "~/utils/createRequiredContext"
import { ScriptInterpreter } from "~/utils/interpreter"

type InterpreterContext = ScriptInterpreter

export const [useInterpreter, InterpreterContextProvider] =
  createRequiredContext<InterpreterContext>("InterpreterContext")
