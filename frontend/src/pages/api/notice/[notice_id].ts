import { Notice } from "@/types/constants"
import { apiWithAuth } from "@/utils/auth"
import { deleteNoticeData, updateNoticeData } from "@/utils/notice"
import { NextApiHandler } from "next"

/**
 * [Protected] Delete Notice
 */
const deleteNotice: NextApiHandler = async (req, res) => {
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

/**
 * [Protected] Update Notice
 */
const updateNotice: NextApiHandler = async (req, res) => {
  const { notice_id } = req.query
  const notice = req.body as Notice
  const status = await updateNoticeData(Number(notice_id), notice)
  if (typeof status === "string") {
    res.status(500).json({ error: status })
    return
  }
  if (!status) {
    res.status(404).json({ error: "An error occurred" })
    return
  }
}

/**
 * [Protected] Actions to Notice
 * @param notice_id ID of the notice
 */
const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "DELETE":
      return deleteNotice(req, res)
    case "PUT":
      return updateNotice(req, res)
    default:
      res.status(405).json({ error: "Method not allowed" })
  }
}

export default apiWithAuth(handler)
