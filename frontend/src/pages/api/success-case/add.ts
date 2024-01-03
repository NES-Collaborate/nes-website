import { SuccessCase } from "@/types/constants"
import { apiWithAuth, getUserSession } from "@/utils/auth"
import { addSuccessCaseData } from "@/utils/successCase"
import { NextApiHandler } from "next"

const addSuccessCase: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const user = await getUserSession(req)
  if (!user || user.type !== "admin") {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  // TODO: Add validations here
  const successCase = req.body as SuccessCase

  const result = addSuccessCaseData(successCase)

  if (!result) {
    res.status(500).json({ error: "Failed to add success case" })
    return
  }

  res.status(200).json({ successCase, status: true })
}

export default apiWithAuth(addSuccessCase)
