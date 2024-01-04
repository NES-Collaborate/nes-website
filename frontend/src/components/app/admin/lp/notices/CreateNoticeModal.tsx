import { ButtonNES } from "@/components/ButtonNES"
import { Loading } from "@/components/Loading"
import { Notice } from "@/types/constants"
import { axiosApi } from "@/utils/axiosClient"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Alert, Button, Input, Modal, Textarea } from "react-daisyui"
import { IoMdClose } from "react-icons/io"

type Props = {
  open: boolean
  setOpen: (b: boolean) => void
}

export const CreateNoticeModal = ({ open, setOpen }: Props) => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notice, setNotice] = useState<Notice>({
    id: 0,
    title: "",
    description: "",
    url: "",
    image: "",
  })

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await axiosApi.post(`/notice/add`, { notice })
    } catch (error) {
      if (typeof error === "string") setError(error)
      else if (error instanceof AxiosError) {
        const data = error.response?.data
        if (data) setError(data.error)
      } else setError("Erro ao criar notícia. Tente novamente mais tarde.")
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setError("")
  }, [open])

  if (!notice) return

  return (
    <Modal.Legacy open={open}>
      <Button
        size="xs"
        shape="circle"
        className="absolute right-2 top-2"
        onClick={() => setOpen(false)}
      >
        <IoMdClose />
      </Button>

      <Modal.Header>Criar Nova Notícia</Modal.Header>

      <Modal.Body className="flex flex-col items-center gap-3">
        {error && (
          <Alert status="error" icon={<IoMdClose />}>
            {error}
          </Alert>
        )}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Título</span>
          </div>
          <Input
            className="w-full max-w-xs"
            value={notice?.title}
            placeholder="Título bem legal"
            color="accent"
            onChange={(e) => setNotice({ ...notice, title: e.target.value })}
            disabled={isLoading}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Descrição</span>
          </div>
          <Textarea
            className="w-full max-w-xs"
            value={notice.description}
            placeholder="Descrição muito emocionante"
            color="accent"
            onChange={(e) => setNotice({ ...notice, description: e.target.value })}
            disabled={isLoading}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">URL</span>
          </div>
          <Input
            className="w-full max-w-xs"
            value={notice.url}
            placeholder="URL da Notícia"
            color="accent"
            onChange={(e) => setNotice({ ...notice, url: e.target.value })}
            disabled={isLoading}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Imagem</span>
          </div>

          <Input
            className="w-full max-w-xs"
            value={notice.image}
            placeholder="URL da Imagem da Notícia"
            color="accent"
            onChange={(e) => setNotice({ ...notice, image: e.target.value })}
            disabled={isLoading}
          />
        </label>

        <ButtonNES
          className="w-2/5 flex items-center justify-center"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? <Loading text="Criando..." /> : "Criar"}
        </ButtonNES>
      </Modal.Body>
    </Modal.Legacy>
  )
}
