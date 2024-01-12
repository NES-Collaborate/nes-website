import ButtonNES from "@/components/ButtonNES"
import { Selection } from "@/data/constants"
import clsx from "clsx"

type Props = {
  selection: Selection
}

/**
 * Material Card
 * @returns {JSX.Element} SelectionCard
 */
const SelectionCard = ({ selection }: Props) => {
  return (
    <>
      <div className="collapse collapse-plus">
        <input type="checkbox" />
        <div
          className={`collapse-title text-xl font-medium ${clsx(
            selection.isOpen === true && "text-success",
            selection.isOpen === false && "text-primary"
          )}`}
        >
          Seleção {selection.year}
        </div>
        <div className="collapse-content flex flex-col ml-2">
          <ButtonNES
            href={{
              pathname: "/nes/subscription/form",
              query: { selectionYear: selection.year },
            }}
            type="navigation"
            style="link"
            className="mb-2"
          >
            Inscrição
          </ButtonNES>
          <ButtonNES
            href={{
              pathname: "/nes/subscription/schedule",
              query: { selectionYear: selection.year },
            }}
            type="navigation"
            style="link"
            className="mb-2"
          >
            Cronograma
          </ButtonNES>
          <ButtonNES href="" type="navigation" style="link" className="mb-2">
            Resultado
          </ButtonNES>
          <ButtonNES href="" type="navigation" style="link" className="mb-2">
            Ementa
          </ButtonNES>
        </div>
      </div>
    </>
  )
}

export default SelectionCard
