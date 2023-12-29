import { apiWithAuth } from "@/utils/auth"
import { deleteNoticeData } from "@/utils/notice"
import { NextApiHandler } from "next"

/**
 * [Protected] Delete a notice
 * @param notice_id ID of the notice
 */
const deleteNotice: NextApiHandler = async (req, res) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  // TODO: Add validations here
  const { notice_id } = req.query

  const status = await deleteNoticeData(Number(notice_id))
  if (typeof status === "string") {
    res.status(500).json({ error: status })
    return
  }
  if (!status) {
    res.status(404).json({ error: "An error occurred" })
    return
  }

  res.status(200).json({ status })
}

export default apiWithAuth(deleteNotice)
