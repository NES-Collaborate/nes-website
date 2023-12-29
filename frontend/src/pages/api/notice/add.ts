import { Notice } from "@/types/constants"
import { apiWithAuth } from "@/utils/auth"
import { addNoticeData } from "@/utils/notice"
import { NextApiHandler } from "next"

/**
 * [Protected] Add a new notice
 * @param notice Notice to add
 */
const addNotice: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  // TODO: Add validations here
  const notice = req.body as Notice

  const result = await addNoticeData(notice)

  if (!result) {
    res.status(500).json({ error: "Failed to add notice" })
    return
  }

  res.status(200).json({ notice, status: true })
}

export default apiWithAuth(addNotice)
// export default addNotice
