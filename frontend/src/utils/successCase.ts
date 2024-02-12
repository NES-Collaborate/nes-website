import { SuccessCase } from "@/types/constants"
import { AxiosError } from "axios"
import { downloadToCache } from "./downloadFile"
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
 * @returns {SuccessCase | string} if success or error, respectively
 */
export const addSuccessCaseData = async (successCase: SuccessCase) => {
  const successCases = (await getSuccessCasesData()) || []
  successCase.id = successCases.length + 1

  // Download image and save in cache folder
  if (successCase.imagePath.startsWith("http")) {
    try {
      const imageUrl = await downloadToCache(successCase.imagePath)
      successCase.imagePath = imageUrl
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.message
      }
      return "Failed to download image"
    }
  }

  successCases.push(successCase)
  const status = await writeJsonFile(SUCCESS_CASES_FILE, successCases)

  if (!status) return status
  else return successCase
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

/**
 * Update a Success Case in JSON file
 * @param id SuccessCase ID
 * @param successCase SuccessCase data to update
 * @returns true if success or string|null if an error occurs
 */
export const updateSuccessCaseData = async (id: number, successCase: SuccessCase) => {
  const successCases = (await getSuccessCasesData()) || []
  const index = successCases.findIndex((successCase) => successCase.id === id)
  if (index === -1) {
    return "Notice not found"
  }

  // security check
  successCase.id = id

  // Download image and save in cache folder
  if (successCase.imagePath.startsWith("http")) {
    try {
      const imageUrl = await downloadToCache(successCase.imagePath)
      successCase.imagePath = imageUrl
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.message
      }
      return "Failed to download image"
    }
  }

  successCases[index] = successCase
  return await writeJsonFile(SUCCESS_CASES_FILE, successCases)
}
