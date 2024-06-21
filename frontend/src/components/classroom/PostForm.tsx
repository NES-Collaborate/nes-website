import { PostFormData } from "@/schemas/post"
import { UseFormReturn } from "react-hook-form"
import { MdFlight } from "react-icons/md"
import { InputField } from "../ui/forms/InputField"
import { TextAreaField } from "../ui/forms/TextAreaField"

const PostForm = ({ form }: { form: UseFormReturn<PostFormData> }) => {
  const { register, handleSubmit } = form

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="flex flex-col items-center"
    >
      <InputField
        label="Título"
        {...register("title")}
        className="input-sm max-w-full"
        boxClassName="max-w-full"
      />

      <TextAreaField
        label="Descrição"
        {...register("content")}
        className="h-64 max-w-full resize-y"
        boxClassName="max-w-full"
      />

      <div className="flex justify-center items-center">
        <button className="btn btn-primary btn-sm">
          <MdFlight size={18} />
          Publicar
        </button>
      </div>
    </form>
  )
}

export default PostForm
