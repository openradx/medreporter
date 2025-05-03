import { RefObject } from "react"
import { StructureData } from "~/schemas/structure"
import { createRequiredContext } from "~/utils/createRequiredContext"

interface StructureContext {
  /**
   * The structureBackupData object is used in the designer when switching between design
   * and preview modes to retain the current state of the structure in the preview.
   * In contrast to the structureLiveData (where keys are field IDs), the keys in
   * structureBackupData are the node IDs of the fields as they are static.
   */
  backupValuesRef: RefObject<StructureData>

  /**
   * The structureDefaultValues object is used to store the default values of the structure
   * and is used to reset the structure to its initial state when the clear all button of
   * the structure while filling out the template is clicked.
   * Keys are the field IDs.
   */
  defaultValuesRef: RefObject<StructureData>
}

export const [useStructure, StructureContextProvider] =
  createRequiredContext<StructureContext>("StructureContext")
