import { useMemo } from "react"
import { useStructureData } from "./useStructureData"

export const useFieldsCode = (): string => {
  const fieldsData = useStructureData()
  const fieldsCode = useMemo(() => `const fields = ${JSON.stringify(fieldsData)}`, [fieldsData])
  return fieldsCode
}
