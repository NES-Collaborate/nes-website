import { getSuccessCasesData } from "@/utils/successCase"
import { NextApiHandler } from "next"

/**
 * Get Success Cases to show on About page
 */
const getSuccessCases: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }
  const successCases = await getSuccessCasesData()
  res.status(200).json({ successCases, status: true })
}


export default getSuccessCases