import { getSelectionsData } from "@/utils/selection"
import { NextApiHandler } from "next"

/**
 * Get Selections
 */
const getSelections: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }
  const selections = await getSelectionsData()
  res.status(200).json({ selections, status: true })
}

export default getSelections
