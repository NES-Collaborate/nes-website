import { CACHE_DIR } from "@/data/constants"
import axios from "axios"
import { createWriteStream } from "fs"
import { mkdir } from "fs/promises"
import path from "path"

/**
 * Download any files from a URL
 * @param url File URL
 * @param filename Filename to save the file
 * @param savePath Directory to save the file
 * @returns void if success or error message
 */
export const downloadFile = async (
  url: string,
  filename: string,
  savePath: string
): Promise<void | string> => {
  try {
    const res = await axios.get(url, { responseType: "stream" })

    await mkdir(savePath, { recursive: true })

    const filePath = path.join(savePath, filename)

    const writer = createWriteStream(filePath)

    res.data.pipe(writer)

    await new Promise<void>((resolve, reject) => {
      writer.on("finish", resolve)
      writer.on("error", reject)
    })
  } catch (e) {
    console.log(e)
    return "Error downloading file"
  }
}

/**
 * Download a file from direct link to cache folder with random filename
 * @param url Direct link
 * @returns string if success, or thrown error
 */
export const downloadToCache = async (url: string) => {
  const ext = url.split(".").pop()?.split("?")[0] // https://dom.com/image.png?width=200 -> png
  const randomFilename = Math.random().toString(36).substring(2)
  const result = await downloadFile(url, `${randomFilename}.${ext}`, CACHE_DIR)
  if (typeof result === "string") return result

  return `/cache/${randomFilename}.${ext}`
}
