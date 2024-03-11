import { FileInputField } from "@/components/ui/forms/FileInputField"
import { InputField } from "@/components/ui/forms/InputField"
import { TextAreaField } from "@/components/ui/forms/TextAreaField"
import { useSession } from "@/contexts/session"
import { useNoticeMutations } from "@/hooks/admin/lp"
import { NoticeFormData, noticeSchema } from "@/schemas/notices"
import { Notice } from "@/types/constants"
import { getAttachmentUrl, uploadAttach } from "@/utils/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "react-daisyui"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaEdit, FaPlus } from "react-icons/fa"

type Props = {
  notice: Notice
  action: "create" | "edit"
  setToast: (toast: string) => void
}

const NoticeForm = ({ notice, action, setToast }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoticeFormData>({
    resolver: zodResolver(noticeSchema),
    values: { ...notice, image: false },
  })

  const { token } = useSession()

  const { createMutation, editMutation } = useNoticeMutations()

  const createNotice = async (formData: Notice) => {
    try {
      await createMutation.mutateAsync(formData)
      setToast("Noticia criada com sucesso!")
    } catch {
      setToast("Erro ao criar notícia.")
    }
  }

  const updateNotice = async (formData: Notice) => {
    try {
      await editMutation.mutateAsync(formData)
      setToast("Notícia editada com sucesso!")
    } catch {
      setToast("Erro ao editar notícia.")
    }
  }

  const submitForm: SubmitHandler<NoticeFormData> = async (data) => {
    var formData = {} as Notice
    if (action === "create") {
      var attach = await uploadAttach(data.image, token)
      if (typeof attach === "string") {
        setToast(attach)
        return
      }
      formData = {
        ...data,
        image: getAttachmentUrl(attach),
        id: notice.id,
      }
      await createNotice(formData)
    } else if (action === "edit") {
      if (data.image) {
        var attach = await uploadAttach(data.image, token)
        if (typeof attach === "string") {
          setToast(attach)
          return
        } else {
          formData = {
            ...data,
            image: getAttachmentUrl(attach),
            id: notice.id,
          }
        }
      } else {
        formData = {
          ...data,
          image: notice.image,
          id: notice.id,
        }
      }
    }
    await updateNotice(formData)
  }

  return (
    <form
      className="flex flex-col items-center gap-2"
      onSubmit={handleSubmit(submitForm)}
    >
      <InputField label="Título" {...register("title")} errors={errors.title} />

      <TextAreaField
        label="Descrição"
        {...register("description")}
        errors={errors.description}
      />

      <InputField
        label="Link"
        helpText="Link para a página (URL)"
        {...register("url")}
        errors={errors.url}
      />

      <FileInputField
        label="Imagem"
        helpText="Capa da Notícia"
        {...register("image")}
        errors={errors.image}
      />

      <Button variant="outline" color="accent">
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
    </form>
  )
}

export default NoticeForm
