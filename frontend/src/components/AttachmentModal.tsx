import { Attach } from "@/types/entities"
import { getAttachmentUrl } from "@/utils/client"
import Image from "next/image"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"

type Props = {
  attach: Attach | null
  setAttach: React.Dispatch<React.SetStateAction<Attach | null>>
  title?: string
  className?: string
}

/**
 * Renders a modal for displaying attachments.
 *
 * @param {Props} attach - the attachment to display
 * @param {function} setAttach - the function to update the attachment state
 * @param {string} title - the title of the modal, defaults to "Arquivo"
 * @param {string} className - the class name of the modal
 * @return {JSX.Element} the modal component
 */
const AttachmentModal = ({ attach, setAttach, title = "Arquivo", className }: Props) => {
  const closeModal = () => setAttach(null)
  return (
    <Modal open={!!attach} className={className} responsive>
      <Button
        onClick={closeModal}
        className="absolute right-2 top-2"
        color="error"
        shape="circle"
        size="xs"
      >
        <IoMdClose />
      </Button>

      <Modal.Header className="font-bold">{title}</Modal.Header>

      <Modal.Body>
        <div className="w-full h-full">
          <Image
            alt="Arquivo"
            width={1000}
            height={1000}
            src={getAttachmentUrl(attach!)}
          />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default AttachmentModal
