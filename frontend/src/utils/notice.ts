import { Notice } from "@/types/constants"
import axios, { AxiosError } from "axios"
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

  // Download image and save in cache folder
  if (notice.image.startsWith("http")) {
    try {
      const res = await axios.get(notice.image, { responseType: "arraybuffer" })
      const b64 = Buffer.from(res.data).toString("base64")
      notice.image = `data:image/png;base64,${b64}` // TODO: Find a better way to do this
    } catch (error) {
      if (typeof error === "string") return error
      else if (error instanceof AxiosError) {
        const data = error.response?.data
        if (data) return data.error
      }
      return "Erro ao baixar imagem. Tente novamente mais tarde."
    }
  }

  notices[index] = notice
  return await writeJsonFile(NOTICE_FILE, notices)
}
