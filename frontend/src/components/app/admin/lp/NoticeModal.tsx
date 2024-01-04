import { Notice } from "@/types/constants"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"
import { NoticeForm } from "./NoticeForm"

type Props = {
  notices: Notice[]
  setNotices: (notices: Notice[]) => void
  action: "create" | "edit"
  index: number
  setIndex: (index: number) => void
  setToast: (toast: string) => void
}

export const NoticeModal = ({
  notices,
  setNotices,
  action,
  index,
  setIndex,
  setToast,
}: Props) => {
  const isOpen = (action == "create" && index == -1) || (action == "edit" && index != -1)

  const [notice, setNotice] = useState<Notice>({
    id: 0,
    title: "",
    description: "",
    image: "",
    url: "",
  })

  useEffect(() => {
    if (action == "edit" && index != -1) {
      const notice = notices.find((n) => n.id == index)
      if (notice) setNotice(notice)
    } else
      setNotice({
        id: 0,
        title: "",
        description: "",
        image: "",
        url: "",
      })
  }, [setNotice, notices, index, action])

  const closeModal = () => {
    switch (action) {
      case "create":
        setIndex(-2)
        break
      case "edit":
        setIndex(-1)
    }
  }

  return (
    <Modal open={isOpen} className="h-3/4" responsive={true}>
      <Button
        onClick={closeModal}
        className="absolute right-2 top-2"
        color="error"
        shape="circle"
        size="xs"
      >
        <IoMdClose />
      </Button>

      <Modal.Header className="font-bold">
        {action == "create" ? "Adicionar Notícia" : "Editar Notícia"}
      </Modal.Header>

      <Modal.Body>
        <NoticeForm
          notice={notice}
          setNotice={setNotice}
          action={action}
          setToast={setToast}
          notices={notices}
          setNotices={setNotices}
        />
      </Modal.Body>
    </Modal>
  )
}
