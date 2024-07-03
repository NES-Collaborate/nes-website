import { useSelections } from "@/hooks/admin/lp"
import SelectionCard from "./SelectionCard"
import Loading from "@/components/Loading"

/**
 * List of NES' selections
 * @returns {JSX.Element} Selections
 */
const Selections = () => {
  const { data: selections = [], isLoading } = useSelections()

  if (selections.length === 0) {
    return null
  }

  return (
    <div>
      {isLoading && (
        <div className="w-full">
          <Loading
            text="Carregando processos seletivos..."
            textClassName="text-lg"
            center
          />
        </div>
      )}
      {selections.map((selection, i) => {
        return <SelectionCard key={i} selection={selection} />
      })}
    </div>
  )
}

export default Selections
