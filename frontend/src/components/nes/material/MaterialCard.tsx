import Image from "next/image"
import { useState } from "react"
import MaterialModal from "./MaterialModal"
import { Material } from "@/data/constants"

/**
 * Material Card
 * @returns {JSX.Element} MaterialCard
 */
const MaterialCard = (material: Material) => {
  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <>
      <div className="flex flex-col items-start px-4 mb-4 max-w-xs">
        <button onClick={openModal}>
          <div className="card card-compact bg-base-100 shadow-xl hover:bg-zinc-500/75">
            <figure className="max-w-xs">
              <Image src={material.imageUrl} alt="" width={500} height={500} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{material.title}</h2>
              <p>{material.description}</p>
            </div>
          </div>
        </button>
      </div>

      <MaterialModal isOpen={modal} onClose={closeModal} material={material} />
    </>
  )
}

export default MaterialCard
