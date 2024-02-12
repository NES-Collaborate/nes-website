import { SuccessCase } from "@/types/constants"
import { apiWithAuth } from "@/utils/auth"
import { deleteSuccessCaseData, updateSuccessCaseData } from "@/utils/successCase"
import { NextApiHandler } from "next"

/**
 * Handles the DELETE request to delete a success case
 */
const deleteSuccessCase: NextApiHandler = async (req, res) => {
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

/**
 * [Protected] Update Success Case
 */
const updateSuccessCase: NextApiHandler = async (req, res) => {
  const { success_case_id } = req.query
  const successCase = req.body as SuccessCase
  const status = await updateSuccessCaseData(Number(success_case_id), successCase)

  if (typeof status === "string") {
    res.status(500).json({ error: status })
    return
  }
  if (!status) {
    res.status(404).json({ error: "An error occurred" })
    return
  }

  res.status(200).json({ status, successCase })
}

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "DELETE":
      return deleteSuccessCase(req, res)
    case "PUT":
      return updateSuccessCase(req, res)
    default:
      res.status(405).json({ error: "Method not allowed" })
  }
}

export default apiWithAuth(handler)
