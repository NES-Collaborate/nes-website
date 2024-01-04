import { ButtonNES } from "@/components/ButtonNES"
import { Notice } from "@/types/constants"
import { cacheFile } from "@/utils/api"
import { axiosApi } from "@/utils/axiosClient"
import { AxiosError } from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Alert, Button, FileInput, Input, Modal, Textarea } from "react-daisyui"
import { IoMdClose } from "react-icons/io"

type Props = {
  notice: Notice | null
  setNotice: (notice: Notice | null) => void
}

export const EditNoticeModal = ({ notice, setNotice }: Props) => {
  const isOpen = notice !== null
  const [error, setError] = useState("")

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
        const url = await cacheFile(file.name, file)
        if (url && notice) setNotice({ ...notice, image: url })
        else setError("Erro ao carregar imagem. Tente novamente mais tarde.")
      }
    }
  

  const handleClick = async () => {
    try {
      await axiosApi.put(`/notice/${notice?.id}`, notice)
    } catch (error) {
      if (typeof error === "string") setError(error)
      else if (error instanceof AxiosError) {
        const data = error.response?.data
        if (data) setError(data.error)
      } else setError("Erro ao editar notícia. Tente novamente mais tarde.")
    }
  }

  useEffect(() => {
    setError("")
  }, [isOpen])

  if (!notice) return

  return (
    <Modal.Legacy open={isOpen}>
      <Button
        size="xs"
        shape="circle"
        className="absolute right-2 top-2"
        onClick={() => setNotice(null)}
      >
        <IoMdClose />
      </Button>

      <Modal.Header>Editar Notícia {notice.id}</Modal.Header>

      <Modal.Body className="flex flex-col items-center gap-3">
        {error && (
          <Alert status="error" icon={<IoMdClose />}>
            {error}
          </Alert>
        )}

        {isOpen && (
          <Image
            src={notice.image}
            alt={notice.title}
            width={300}
            height={400}
            className="w-full max-w-sm rounded-lg h-48"
          />
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
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Imagem</span>
          </div>

          <FileInput
            size="sm"
            color="accent"
            bordered
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <ButtonNES className="w-2/5" onClick={handleClick}>
          Editar
        </ButtonNES>
      </Modal.Body>
    </Modal.Legacy>
  )
}
