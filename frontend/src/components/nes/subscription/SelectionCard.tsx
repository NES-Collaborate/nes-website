import ButtonNES from "@/components/ButtonNES"
import { Selection } from "@/data/constants"
import clsx from "clsx"
import Link from "next/link"

type Props = {
  selection: Selection
}

/**
 * Selection Card
 * @returns {JSX.Element} SelectionCard
 */
const SelectionCard = ({ selection }: Props) => {
  return (
    <Link
      href={{
        pathname: "/nes/subscription/program",
        query: { selectionYear: selection.year },
      }}
      className="collapse-plus"
    >
      <div
        className={`collapse-title text-xl font-medium ${clsx(
          selection.isOpen === true && "text-success",
          selection.isOpen === false && "text-primary"
        )}`}
      >
        Seleção {selection.year}
      </div>
    </Link>
  )
}

export default SelectionCard
