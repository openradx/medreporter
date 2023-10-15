/**
 * Fully typed translations.
 *
 * Idea from https://dev.to/halolab/implementing-the-translate-function-with-typescript-5d8d
 */
type PathKeys<T> = T extends string
  ? []
  : {
      [K in keyof T]: [K, ...PathKeys<T[K]>]
    }[keyof T]

type Join<T extends string[], Delimiter extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer Other]
  ? F extends string
    ? `${F}${Delimiter}${Join<Extract<Other, string[]>, Delimiter>}`
    : never
  : string

type Trim<A extends string> = A extends ` ${infer B}`
  ? Trim<B>
  : A extends `${infer C} `
  ? Trim<C>
  : A

type SearchForVariable<T extends string> = T extends `${infer A}{{${infer B}}}${infer C}`
  ? SearchForVariable<A> | Trim<B> | SearchForVariable<C>
  : never

type Variables<
  T extends string | object,
  Path extends string,
  Delimiter extends string,
> = Path extends `${infer A}${Delimiter}${infer O}`
  ? A extends keyof T
    ? Variables<Extract<T[A], string | object>, O, Delimiter>
    : never
  : Path extends `${infer A}`
  ? A extends keyof T
    ? SearchForVariable<Extract<T[A], string>>
    : never
  : never

type Resource = { [key: string]: Resource | string }
export type Resources = { [lng: string]: Resource }

interface FlattenedResource {
  [key: string]: string
}

function flattenResource(
  resource: Resource,
  prefix: string = "",
  res: FlattenedResource = {}
): FlattenedResource {
  Object.keys(resource).forEach((key) => {
    const value = resource[key]
    if (typeof value === "string") {
      res[`${prefix}${key}`] = value
    } else {
      flattenResource(value, `${prefix}${key}.`, res)
    }
  })
  return res
}

function hasSameKeys(
  res1: FlattenedResource,
  res2: FlattenedResource
): { same: boolean; missingInRes1: string[]; missingInRes2: string[] } {
  const keys1 = Object.keys(res1).sort()
  const keys2 = Object.keys(res2).sort()
  const missingInRes1 = keys2.filter((key) => !keys1.includes(key))
  const missingInRes2 = keys1.filter((key) => !keys2.includes(key))

  return {
    same: missingInRes1.length === 0 && missingInRes2.length === 0,
    missingInRes1,
    missingInRes2,
  }
}

function checkResourcesForSameKeys(resources: Resources): boolean {
  const lngs = Object.keys(resources)
  const len = lngs.length

  let valid = true
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      const res1 = flattenResource(resources[lngs[i]])
      const res2 = flattenResource(resources[lngs[j]])
      const { same, missingInRes1, missingInRes2 } = hasSameKeys(res1, res2)

      if (!same) {
        valid = false

        missingInRes1 &&
          // eslint-disable-next-line no-console
          console.error(`Resource '${lngs[i]}' is missing keys: ${missingInRes1.join(", ")}`)
        missingInRes2 &&
          // eslint-disable-next-line no-console
          console.error(`Resource '${lngs[j]}' is missing keys: ${missingInRes2.join(", ")}`)
      }
    }
  }

  return valid
}

function hasSameVariables(
  trans1: string,
  trans2: string
): { same: boolean; missingInRes1: string[]; missingInRes2: string[] } {
  const regex = /\{\{([^}]*?(?:\}(?!\})[^}]*)*)\}\}/g
  const vars1 = [...trans1.matchAll(regex)].map((match) => match[1])
  const vars2 = [...trans2.matchAll(regex)].map((match) => match[1])
  const missingInRes1 = vars2.filter((v) => !vars1.includes(v))
  const missingInRes2 = vars1.filter((v) => !vars2.includes(v))

  return {
    same: missingInRes1.length === 0 && missingInRes2.length === 0,
    missingInRes1,
    missingInRes2,
  }
}

function checkResourcesForSameVariables(resources: Resources): boolean {
  const lngs = Object.keys(resources)
  const len = lngs.length

  let valid = true
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      const res1 = flattenResource(resources[lngs[i]])
      const res2 = flattenResource(resources[lngs[j]])

      // At this point we already checked that both resources have the same keys
      for (const key of Object.keys(res1)) {
        const value1 = res1[key]
        const value2 = res2[key]
        const { same, missingInRes1, missingInRes2 } = hasSameVariables(value1, value2)

        if (!same) {
          valid = false

          missingInRes1 &&
            // eslint-disable-next-line no-console
            console.error(
              `Resource '${lngs[i]}' has missing variables in key '${key}': ${missingInRes1.join(
                ", "
              )}`
            )
          missingInRes2 &&
            // eslint-disable-next-line no-console
            console.error(
              `Resource '${lngs[j]}' has missing variables in key '${key}': ${missingInRes2.join(
                ", "
              )}`
            )
        }
      }
    }
  }

  return valid
}

interface MicroI18nOptions {
  debugKeys: boolean
  debugResources: boolean
  missingDefault: string
}

const defaultMicroI18nOptions = {
  debugKeys: false,
  debugResources: false,
  missingDefault: "",
} satisfies MicroI18nOptions

export class MicroI18n<T extends Resources> {
  private _options: MicroI18nOptions
  private lng: keyof T
  private listeners: {
    optionsChanged: ((options: MicroI18nOptions) => void)[]
    languageChanged: ((lng: keyof T) => void)[]
    missingKey: ((key: string) => void)[]
  } = {
    optionsChanged: [],
    languageChanged: [],
    missingKey: [],
  }

  constructor(
    private resources: T,
    options?: Partial<MicroI18nOptions>
  ) {
    ;[this.lng] = Object.keys(resources)

    this._options = { ...defaultMicroI18nOptions, ...options }

    if (this._options.debugResources) {
      const valid = checkResourcesForSameKeys(this.resources)
      if (valid) {
        checkResourcesForSameVariables(this.resources)
      }
    }
  }

  on(eventName: "optionsChanged", handler: (options: MicroI18nOptions) => void): void
  on(eventName: "languageChanged", handler: (lng: keyof T) => void): void
  on(eventName: "missingKey", handler: (key: string) => void): void
  on(eventName: string, handler: (...args: any[]) => void): void {
    if (eventName in this.listeners) {
      const listeners = (this.listeners as any)[eventName] as Function[]
      listeners.push(handler)
    }
  }

  off(
    eventName: "optionsChanged" | "languageChanged" | "missingKey",
    handler?: (...args: any[]) => void
  ): void {
    if (eventName in this.listeners) {
      const listeners = (this.listeners as any)[eventName] as Function[]
      if (!handler) {
        listeners.length = 0
      } else {
        const index = listeners.indexOf(handler)
        if (index > -1) {
          listeners.splice(index, 1)
        }
      }
    }
  }

  set options(options: Partial<MicroI18nOptions>) {
    this._options = { ...this._options, ...options }
    for (const listener of this.listeners.optionsChanged) {
      listener(this._options)
    }
  }

  get options(): MicroI18nOptions {
    return this._options
  }

  get currentLanguage(): keyof T {
    return this.lng
  }

  changeLanguage(lng: keyof T): void {
    this.lng = lng
    for (const listener of this.listeners.languageChanged) {
      listener(lng)
    }
  }

  get supportedLanguages(): (keyof T)[] {
    return Object.keys(this.resources)
  }

  t<P extends Join<PathKeys<T[keyof T]>, ".">>(
    // Rest parameters allow here to check if variables are present in the translation
    // string and then require a second parameter
    // https://stackoverflow.com/a/75509515/166229
    ...args: Variables<T[keyof T], P, "."> extends never
      ? [P]
      : [P, Record<Variables<T[keyof T], P, ".">, string>]
  ): string {
    const paths = args[0]
    const keys = paths.split(".")

    if (!(this.lng in this.resources)) {
      throw new Error(`Language "${String(this.lng)}" not in resources.`)
    }
    const resource: Resource = this.resources[this.lng]

    const result = keys.reduce((value: string | Resource | undefined, key: string) => {
      if (typeof value === "object" && key in value) {
        return value[key]
      }
      return undefined
    }, resource)

    let value = this._options.missingDefault
    if (typeof result === "string") {
      value = result
    } else {
      for (const listener of this.listeners.missingKey) {
        listener(keys.join("."))
      }
    }

    if (this._options.debugKeys) {
      return paths
    }

    const vars = args[1]
    vars &&
      Object.keys(vars).forEach((key) => {
        const variable = (vars as Record<string, string>)[key] as string
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g")
        value = value.replace(regex, variable)
      })

    return value
  }
}
