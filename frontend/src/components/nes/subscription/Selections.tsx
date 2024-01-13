import { SELECTIONS_EXAMPLES } from "@/data/constants"
import SelectionCard from "./SelectionCard"

/**
 * List of NES' selections
 * @returns {JSX.Element} Selections
 */
const Selections = () => {
  return (
    <div>
      {SELECTIONS_EXAMPLES.map((selection, i) => {
        return <SelectionCard key={i} selection={selection} />
      })}
    </div>
  )
}

export default Selections
