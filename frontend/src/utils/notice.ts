import { Notice } from "@/types/constants"
import { readJsonFile, writeJsonFile } from "./json"

/**
 * Load the Notices data from JSON file
 * @returns List of Notices
 */
export const getNoticesData = async (): Promise<Notice[]> => {
  return await readJsonFile("src/data/notices.json")
}

/**
 * Add a new Notice to JSON file
 * @param notice Notice to add
 * @returns true or null if success or error, respectively
 */
export const addNoticeData = async (notice: Notice) => {
  const notices = (await getNoticesData()) || []
  notice.id = notices.length + 1
  notices.push(notice)
  return await writeJsonFile("src/data/notices.json", notices)
}

export const deleteNoticeData = async (id: number) => {
  const notices = await getNoticesData()
  if (!notices) {
    return "Failed to load notices"
  }
  const index = notices.findIndex((notice) => notice.id === id)
  if (index === -1) {
    return "Notice not found"
  }

  return await writeJsonFile(
    "src/data/notices.json",
    notices.filter((notice) => notice.id !== id)
  )
}
