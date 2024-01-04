import { apiWithAuth } from "@/utils/auth"
import fs from "fs/promises"
import { NextApiHandler } from "next"
import path from "path"

const getCachedPath = async () => {
  const folderPath = path.join(process.cwd(), "public", "cached")
  try {
    await fs.access(folderPath)
  } catch (err) {
    await fs.mkdir(folderPath, { recursive: true })
  }
  return folderPath
}

const setCache: NextApiHandler = async (req, res) => {
  const { key } = req.query
  const { value } = req.body
  const formData = await req.blob()

  console.log(formData)

  if (!value) {
    res.status(400).json({ error: "Missing value" })
    return
  }

  if (!key) {
    res.status(400).json({ error: "Missing key" })
    return
  }

  console.log(value)

  const ext = typeof key === "string" ? key.split(".").pop() : key[0].split(".").pop()
  console.log(Math.random().toString(36))
  const randomFilename = `${Math.random().toString(36)}.${ext}`
  const folderPath = await getCachedPath()
  const filePath = path.join(folderPath, randomFilename)

  await fs.writeFile(filePath, value)

  // res.status(200).json({ url: `/cached/${randomFilename}` })
}

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    // case "GET":
    //   return getCache(req, res)
    case "PUT":
      return await setCache(req, res)
    default:
      res.status(405).json({ error: "Method not allowed" })
  }
}

export default apiWithAuth(handler)
