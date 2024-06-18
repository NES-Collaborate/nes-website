import { Classroom } from "@/types/entities"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"
import CreatePostTabs from "./CreatePostTabs"

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  classroom?: Classroom
}

const CreatePostModal = ({ isOpen, setIsOpen, classroom }: Props) => {
  return (
    <Modal open={isOpen} className="w-full max-w-xl px-0.5 pb-0" responsive>
      <Button
        onClick={() => setIsOpen(false)}
        className="absolute right-2 top-2"
        color="error"
        shape="circle"
        size="xs"
      >
        <IoMdClose />
      </Button>

      <Modal.Header className="font-semibold text-lg pl-2 mb-2">
        Adicionar nova postagem ao {classroom?.name}
      </Modal.Header>

      <Modal.Body>
        <CreatePostTabs classroom={classroom} />
      </Modal.Body>
    </Modal>
  )
}

export default CreatePostModal
