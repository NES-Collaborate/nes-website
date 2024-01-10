import { useEffect, useState } from "react"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"
import { Material } from "@/data/constants"

type Props = {
  material: Material
  isOpen: boolean
  onClose: () => void
}

const MaterialModal = ({ material, isOpen = false, onClose }: Props) => {
  return (
    <Modal open={isOpen} className="h-full" responsive={true}>
      <Button
        onClick={onClose}
        className="absolute right-2 top-2"
        color="error"
        shape="circle"
        size="xs"
      >
        <IoMdClose />
      </Button>

      <Modal.Header className="font-bold">{material.title}</Modal.Header>

      <Modal.Body className="h-screen">
        <iframe
          width="100%"
          height="75%"
          src={material.url}
          title={material.title}
          allowFullScreen
        ></iframe>
      </Modal.Body>
    </Modal>
  )
}

export default MaterialModal
