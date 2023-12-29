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
  res.status(200).json({ notices, status: true })
}

export default getNotices
