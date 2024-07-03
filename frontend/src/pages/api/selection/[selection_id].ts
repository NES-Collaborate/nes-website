import { Selection } from "@/types/constants"
import { apiWithAuth } from "@/utils/auth"
import { deleteSelectionData, updateSelectionData } from "@/utils/selection"
import { NextApiHandler } from "next"

/**
 * [Protected] Delete Selection
 */
const deleteSelection: NextApiHandler = async (req, res) => {
  const { selection_id } = req.query
  const status = await deleteSelectionData(Number(selection_id))
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
 * [Protected] Update Selection
 */
const updateSelection: NextApiHandler = async (req, res) => {
  const { selection_id } = req.query
  const selection = req.body as Selection
  const status = await updateSelectionData(Number(selection_id), selection)
  if (typeof status === "string") {
    res.status(500).json({ error: status })
    return
  }
  if (!status) {
    res.status(404).json({ error: "An error occurred" })
    return
  }

  res.status(200).json({ selection, status: true })
}

/**
 * [Protected] Actions to Selection
 * @param selection_id ID of the selection
 */
const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "DELETE":
      return deleteSelection(req, res)
    case "PUT":
      return updateSelection(req, res)
    default:
      res.status(405).json({ error: "Method not allowed" })
  }
}

export default apiWithAuth(handler)
