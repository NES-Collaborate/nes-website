import { Notice } from "@/types/constants"
import { readJsonFile, writeJsonFile } from "./json"

const NOTICE_FILE = "src/data/notices.json"

/**
 * Load the Notices data from JSON file
 * @returns List of Notices
 */
export const getNoticesData = async (): Promise<Notice[]> => {
  return await readJsonFile(NOTICE_FILE)
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
  return await writeJsonFile(NOTICE_FILE, notices)
}

/**
 * Delete a Notice from JSON file
 * @param id Notice ID
 * @returns null if success or string|null if an error occurs
 */
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
    NOTICE_FILE,
    notices.filter((notice) => notice.id !== id)
  )
}

/**
 * Update a Notice in JSON file
 * @param id Notice ID
 * @param notice Notice data to update
 */
export const updateNoticeData = async (id: number, notice: Notice) => {
  const notices = (await getNoticesData()) || []
  const index = notices.findIndex((notice) => notice.id === id)
  if (index === -1) {
    return "Notice not found"
  }

  // Security check
  notice.id = id
  notices[index] = notice
  return await writeJsonFile(NOTICE_FILE, notices)
}
