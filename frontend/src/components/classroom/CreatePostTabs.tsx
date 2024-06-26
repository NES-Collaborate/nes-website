import { PostFormData, postSchema } from "@/schemas/post"
import { Classroom } from "@/types/entities"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import PostForm from "./PostForm"
import PostPreview from "./PostPreview"

type Props = {
  classroom?: Classroom
}

const CreatePostTabs = ({ classroom }: Props) => {
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form")

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  })

  return (
    <div role="tablist" className="tabs tabs-boxed">
      <input
        type="radio"
        name="form"
        role="tab"
        className="tab"
        aria-label="Formulário"
        onClick={() => setActiveTab("form")}
        checked={activeTab === "form"}
      />
      <div role="tabpanel" className="tab-content">
        <PostForm form={form} />
      </div>

      <input
        type="radio"
        name="preview"
        role="tab"
        className="tab"
        aria-label="Preview"
        onClick={() => setActiveTab("preview")}
        checked={activeTab === "preview"}
      />

      <div role="tabpanel" className="tab-content">
        <PostPreview post={form.getValues()} />
      </div>
    </div>
  )
}

export default CreatePostTabs
