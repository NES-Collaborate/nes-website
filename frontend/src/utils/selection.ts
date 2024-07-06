import { Selection } from "@/types/constants"
import { AxiosError } from "axios"
import { downloadToCache } from "./downloadFile"
import { readJsonFile, writeJsonFile } from "./json"

const SELECTION_FILE = "src/data/selections.json"

/**
 * Load the Selections data from JSON file
 * @returns List of Selections
 */
export const getSelectionsData = async (): Promise<Selection[]> => {
  return await readJsonFile(SELECTION_FILE)
}

/**
 * Add a new Selection to JSON file
 * @param selection Selection to add
 * @returns true or null if success or error, respectively
 */
export const addSelectionData = async (selection: Selection) => {
  const selections = (await getSelectionsData()) || []
  selection.id = selections.length + 1

  selections.push(selection)
  return await writeJsonFile(SELECTION_FILE, selections)
}

/**
 * Delete a Selection from JSON file
 * @param id Selection ID
 * @returns null if success or string|null if an error occurs
 */
export const deleteSelectionData = async (id: number) => {
  const selections = await getSelectionsData()
  if (!selections) {
    return "Failed to load selections"
  }
  const index = selections.findIndex((selection) => selection.id === id)
  if (index === -1) {
    return "Selection not found"
  }

  return await writeJsonFile(
    SELECTION_FILE,
    selections.filter((selection) => selection.id !== id)
  )
}

/**
 * Update a Selection in JSON file
 * @param id Selection ID
 * @param selection Selection data to update
 */
export const updateSelectionData = async (id: number, selection: Selection) => {
  const selections = (await getSelectionsData()) || []
  const index = selections.findIndex((selection) => selection.id === id)
  if (index === -1) {
    return "Selection not found"
  }

  // Security check
  selection.id = id

  selections[index] = selection
  return await writeJsonFile(SELECTION_FILE, selections)
}
