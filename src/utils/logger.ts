type Level = "info" | "error"

type LogItem = {
  level: Level
  message: string
}

export class Logger {
  public log: LogItem[] = []
  public consoleEnabled = true

  constructor(public logSize: number = 1000) {}

  public info(message: string) {
    this.addToLog("info", message)

    if (this.consoleEnabled) {
      // eslint-disable-next-line no-console
      console.info(message)
    }
  }

  public error(message: string) {
    this.addToLog("error", message)

    if (this.consoleEnabled) {
      // eslint-disable-next-line no-console
      console.error(message)
    }
  }

  public clear() {
    this.log.length = 0
  }

  private addToLog(level: Level, message: string) {
    this.log.push({ level, message })
    if (this.log.length > this.logSize) {
      this.log.splice(0, this.log.length - this.logSize)
    }
  }
}

export const logger = new Logger()
