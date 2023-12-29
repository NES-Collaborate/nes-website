import { getNoticesData } from "@/utils/notice"
import { NextApiHandler } from "next"

/**
 * Get Notices to show on Home
 */
const getNotices: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }
  const notices = await getNoticesData()
  setTimeout(() => {
    res.status(200).json({ notices, status: true })
  }, 2000)
}

export default getNotices
