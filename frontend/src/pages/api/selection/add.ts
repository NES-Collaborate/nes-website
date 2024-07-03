import { Selection } from "@/types/constants"
import { apiWithAuth, getUserSession } from "@/utils/auth"
import { addSelectionData } from "@/utils/selection"
import { NextApiHandler } from "next"

/**
 * [Protected] Add a new selection
 * @param selection Selection to add
 */
const addSelection: NextApiHandler = async (req, res) => {
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
  const selection = req.body as Selection

  const result = await addSelectionData(selection)

  if (!result) {
    res.status(500).json({ error: "Failed to add selection" })
    return
  }

  res.status(200).json({ selection, status: true })
}

export default apiWithAuth(addSelection)
// export default addSelection
