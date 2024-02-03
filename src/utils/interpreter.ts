import { QuickJSRuntime, errors } from "quickjs-emscripten"

export class InterpreterError extends Error {}

export class ScriptInterpreter {
  constructor(private runtime: QuickJSRuntime) {}

  evalCodeToBoolean(sharedCode: string, fieldsCode: string, scriptCode: string): boolean {
    return Boolean(this.evalCode(sharedCode, fieldsCode, scriptCode))
  }

  evalCodeToString(sharedCode: string, fieldsCode: string, scriptCode: string): string {
    return String(this.evalCode(sharedCode, fieldsCode, scriptCode))
  }

  dispose() {
    this.runtime.dispose()
  }

  private evalCode(commonCode: string, fieldsCode: string, scriptCode: string) {
    const vm = this.runtime.newContext()
    commonCode && vm.evalCode(commonCode, "common.js")
    fieldsCode && vm.evalCode(fieldsCode, "fields.js")
    const result = vm.evalCode(scriptCode, "script.js")

    try {
      const unwrapped = vm.unwrapResult(result)
      const dumped = vm.dump(unwrapped)
      unwrapped.dispose()
      return dumped
    } catch (e) {
      if (e instanceof errors.QuickJSUnwrapError) {
        const cause = e.cause as Error
        let message = `${cause.name}: ${cause.message}`
        const match = cause.stack?.match(/script.js:(\d+)/)
        const line = match ? parseInt(match[0], 10) : null
        if (line) {
          message += ` on line ${line}`
        }
        throw new InterpreterError(message, { cause: e })
      }
      throw new InterpreterError("Unknown error while interpreting the code", { cause: e })
    } finally {
      vm.dispose()
    }
  }
}
