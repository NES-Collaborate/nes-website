import { Notice } from "@/types/constants"
import { axiosApi } from "@/utils/axiosClient"
import { useState } from "react"
import { Button, Input, Textarea } from "react-daisyui"
import { FaEdit, FaPlus } from "react-icons/fa"

type Props = {
  notice: Notice
  setNotice: (notice: Notice) => void
  action: "create" | "edit"
  setToast: (toast: string) => void
  notices: Notice[]
  setNotices: (notices: Notice[]) => void
}

export const NoticeForm = ({
  notice,
  setNotice,
  action,
  setToast,
  notices,
  setNotices,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const createNotice = async () => {
    try {
      const res = await axiosApi.post("/notice/add", notice)
      setNotices([...notices, res.data.notice])
      setToast("Noticia criada com sucesso!")
    } catch {
      setToast("Erro ao criar notícia.")
    }
  }

  const editNotice = async () => {
    try {
      const res = await axiosApi.put(`/notice/${notice.id}`, notice)
      setNotices(notices.map((n) => (n.id == notice.id ? res.data.notice : n)))
      setToast("Notícia editada com sucesso!")
    } catch {
      setToast("Erro ao editar notícia.")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Verify if all fields are filled
    if (!notice.title || !notice.description || !notice.url || !notice.image) {
      setToast("Preencha todos os campos!")
      setIsLoading(false)
      return
    }
    switch (action) {
      case "create":
        await createNotice()
        break
      case "edit":
        await editNotice()
        break
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Título</span>
        </div>
        <Input
          placeholder="Eu sou um título..."
          size="md"
          value={notice.title}
          onChange={(e) => setNotice({ ...notice, title: e.target.value })}
          color="primary"
          disabled={isLoading}
          bordered
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Descrição</span>
        </div>
        <Textarea
          placeholder="Uma descrição emocionante aqui..."
          size="md"
          value={notice.description}
          color="primary"
          onChange={(e) => setNotice({ ...notice, description: e.target.value })}
          disabled={isLoading}
          bordered
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">URL</span>
        </div>
        <Input
          placeholder="Link para o site da notícia"
          size="md"
          value={notice.url}
          onChange={(e) => setNotice({ ...notice, url: e.target.value })}
          color="primary"
          disabled={isLoading}
          bordered
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Imagem</span>
        </div>
        <Input
          placeholder="Link para imagem da noticia"
          size="md"
          value={notice.image}
          onChange={(e) => setNotice({ ...notice, image: e.target.value })}
          color="primary"
          disabled={isLoading}
          bordered
        />
      </label>

      <Button variant="outline" color="accent" onClick={handleSubmit}>
        {action === "create" ? (
          <>
            <FaPlus /> Criar
          </>
        ) : (
          <>
            <FaEdit /> Editar
          </>
        )}
      </Button>
    </div>
  )
}
