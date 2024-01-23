import { apiWithAuth, getUserSession } from "@/utils/auth"
import { deleteSuccessCaseData } from "@/utils/successCase"
import { NextApiHandler } from "next"

/**
 * Handles the DELETE request to delete a success case,
 * verifies user's admin status, and returns appropriate
 * status codes and error messages if necessary.
 *
 * @param {NextApiRequest} req - the request object
 * @param {NextApiResponse} res - the response object
 * @return {Promise<void>} a Promise that resolves to void
 */
const deleteSuccessCase: NextApiHandler = async (req, res) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const user = await getUserSession(req)
  if (!user || user.type !== "admin") {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const { success_case_id } = req.query

  const status = await deleteSuccessCaseData(Number(success_case_id))
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

export default apiWithAuth(deleteSuccessCase)
