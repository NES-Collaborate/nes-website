import { axiosApi } from "./axiosClient"

/**
 * Shortcut for upload small files like image or PDF for preview or any other purpose
 * @param key Filename of the File (it's unique)
 * @param value File in base64
 * @returns URL of the file in cache or null if error
 */
export const cacheFile = async (key: string, value: File): Promise<string | null> => {
  const formData = new FormData()
  formData.append("value", value)

  try {
    const res = await axiosApi.put(`/cache/${key}`, formData)
    return res.data.url
  } catch (err) {
    return null
  }
}
