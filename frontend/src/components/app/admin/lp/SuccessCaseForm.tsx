import { SuccessCase } from "@/types/constants"
import { axiosApi } from "@/utils/axiosClient"
import { useState } from "react"
import { Button, Input, Textarea } from "react-daisyui"
import { FaEdit, FaPlus } from "react-icons/fa"

type Props = {
  successCase: SuccessCase
  setSuccessCase: (successCase: SuccessCase) => void
  action: "create" | "edit"
  setToast: (toast: string) => void
  successCases: SuccessCase[]
  setSuccessCases: (successCases: SuccessCase[]) => void
}

const SuccessCaseForm = ({
  successCase,
  setSuccessCase,
  action,
  setToast,
  successCases,
  setSuccessCases,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const createSuccessCase = async () => {
    try {
      const res = await axiosApi.post("/success-case/add", successCase)
      setSuccessCases([...successCases, res.data.successCase])
      setToast("Caso de sucesso criado com sucesso!")
    } catch {
      setToast("Erro ao criar caso de sucesso.")
    }
  }

  const editSuccessCase = async () => {
    try {
      const res = await axiosApi.put(`/success-case/${successCase.id}`, successCase)
      setSuccessCases(
        successCases.map((n) => (n.id == successCase.id ? res.data.successCase : n))
      )
      setToast("Caso de sucesso editado com sucesso!")
    } catch {
      setToast("Erro ao editar caso de sucesso.")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Verify if all fields are filled
    if (
      !successCase.name ||
      !successCase.city ||
      !successCase.results ||
      !successCase.difficulties ||
      !successCase.phrase ||
      !successCase.imagePath
    ) {
      setToast("Preencha todos os campos!")
      setIsLoading(false)
      return
    }
    switch (action) {
      case "create":
        await createSuccessCase()
        break
      case "edit":
        await editSuccessCase()
        break
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Nome</span>
        </div>
        <Input
          placeholder="Eu sou um nome..."
          size="md"
          value={successCase.name}
          onChange={(e) => setSuccessCase({ ...successCase, name: e.target.value })}
          color="primary"
          disabled={isLoading}
          bordered
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Cidade - Estado</span>
        </div>
        <Input
          placeholder="A cidade e o estado vão aqui..."
          size="md"
          value={successCase.city}
          color="primary"
          onChange={(e) => setSuccessCase({ ...successCase, city: e.target.value })}
          disabled={isLoading}
          bordered
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Resultados</span>
        </div>
        <Textarea
          placeholder="Os resultados vão aqui..."
          size="md"
          value={successCase.results}
          onChange={(e) => setSuccessCase({ ...successCase, results: e.target.value })}
          color="primary"
          disabled={isLoading}
          bordered
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Dificuldades</span>
        </div>
        <Textarea
          placeholder="As dificuldades vão aqui..."
          size="md"
          value={successCase.difficulties}
          onChange={(e) =>
            setSuccessCase({ ...successCase, difficulties: e.target.value })
          }
          color="primary"
          disabled={isLoading}
          bordered
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Frase Pessoal</span>
        </div>
        <Input
          placeholder="Uma bela frase vai aqui..."
          size="md"
          value={successCase.phrase}
          onChange={(e) => setSuccessCase({ ...successCase, phrase: e.target.value })}
          color="primary"
          disabled={isLoading}
          bordered
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Imagem do Aluno</span>
        </div>
        <Input
          placeholder="Link da imagem"
          size="md"
          value={successCase.imagePath}
          onChange={(e) => setSuccessCase({ ...successCase, imagePath: e.target.value })}
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

export default SuccessCaseForm
