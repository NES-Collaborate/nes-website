import { Classroom } from "@/types/entities"
import { useState } from "react"

type Props = {
  classroom?: Classroom
}

const CreatePostTabs = ({ classroom }: Props) => {
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form")

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
      <div role="tabpanel" className="tab-content p-10 h-56">
        Formulário
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

      <div role="tabpanel" className="tab-content p-10 h-56">
        Pré-visualização do conteúdo escrito no formulário com renderização do markdown.
      </div>
    </div>
  )
}

export default CreatePostTabs
