import { SuccessCase } from "@/types/constants"
import { readJsonFile, writeJsonFile } from "./json"

const SUCCESS_CASES_FILE = "src/data/success-cases.json"

/**
 * Load the Success Cases data from JSON file
 * @returns List of Success Cases
 */
export const getSuccessCasesData = async (): Promise<SuccessCase[]> => {
  return await readJsonFile(SUCCESS_CASES_FILE)
}

/**
 * Add a new Success Case to JSON file
 * @param successCase Success Case to add
 * @returns true or null if success or error, respectively
 */
export const addSuccessCaseData = async (successCase: SuccessCase) => {
  const successCases = (await getSuccessCasesData()) || []
  successCase.id = successCases.length + 1
  successCases.push(successCase)
  return await writeJsonFile(SUCCESS_CASES_FILE, successCases)
}

/**
 * Delete a Success Case from JSON file
 * @param id Success Case ID
 * @returns true if success or string|null if an error occurs
 */
export const deleteSuccessCaseData = async (id: number) => {
  const successCases = await getSuccessCasesData()
  if (!successCases) {
    return "Failed to load success cases"
  }
  const index = successCases.findIndex((successCase) => successCase.id === id)
  if (index === -1) {
    return "Success case not found"
  }

  return await writeJsonFile(
    SUCCESS_CASES_FILE,
    successCases.filter((successCase) => successCase.id !== id)
  )
}
