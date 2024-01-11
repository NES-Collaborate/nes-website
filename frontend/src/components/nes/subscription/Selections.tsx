import SelectionCard from "./SelectionCard"

/**
 * List of NES' selections
 * @returns {JSX.Element} Selections
 */
const Selections = () => {
  return (
    <div>
      <SelectionCard year="2024" isOpen={true} />
      <SelectionCard year="2023" isOpen={false} />
    </div>
  )
}

export default Selections
