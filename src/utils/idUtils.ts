import { customAlphabet } from "nanoid"
import { alphanumeric } from "nanoid-dictionary"

const customId = customAlphabet(alphanumeric, 21)

export const createInstanceId = () => `i_${customId()}`

export const createSectionId = () => `s_${customId()}`
