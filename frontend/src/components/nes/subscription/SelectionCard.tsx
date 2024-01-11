import ButtonNES from "@/components/ButtonNES"
import { Selection } from "@/data/constants"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

/**
 * Material Card
 * @returns {JSX.Element} SelectionCard
 */
const SelectionCard = (selection: Selection) => {
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
          <ButtonNES href="" type="navigation" style="link" className="mb-2">
            Inscrição
          </ButtonNES>
          <ButtonNES href="" type="navigation" style="link" className="mb-2">
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
