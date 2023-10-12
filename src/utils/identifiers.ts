import { customAlphabet } from "nanoid"
import { alphanumeric } from "nanoid-dictionary"

const customId = customAlphabet(alphanumeric, 21)

export const createGid = () => `gid_${customId()}`
