import { useNoticeMutations } from "@/hooks/admin/lp"
import { Notice } from "@/types/constants"
import { useState } from "react"
import { Button, FileInput, Input, Textarea } from "react-daisyui"
import { FaEdit, FaPlus } from "react-icons/fa"

type Props = {
  notice: Notice
  setNotice: (notice: Notice) => void
  action: "create" | "edit"
  setToast: (toast: string) => void
  notices: Notice[]
}

const NoticeForm = ({ notice, setNotice, action, setToast, notices }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setNotice({ ...notice, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const { createMutation, editMutation } = useNoticeMutations()

  const createNotice = async () => {
    try {
      await createMutation.mutateAsync(notice)
      setToast("Noticia criada com sucesso!")
    } catch {
      setToast("Erro ao criar notícia.")
    }
  }

  const editNotice = async () => {
    try {
      await editMutation.mutateAsync(notice)
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
        <FileInput
          size="md"
          color="primary"
          onChange={handleImageChange}
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

export default NoticeForm
