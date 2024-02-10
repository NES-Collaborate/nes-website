import { useBackend } from "@/contexts/backend"
import { Property } from "@/types/entities"
import { User } from "@/types/user"
import { useEffect, useState } from "react"
import { Button, Input } from "react-daisyui"
import { FaEdit, FaPlus } from "react-icons/fa"
import UserSearchInput from "../../UserSearchInput"

type Props = {
  property: Property
  setProperty: (property: Property) => void
  action: string
  setToast: (toast: string) => void
  properties: Property[]
  setProperties: (properties: Property[]) => void
}

const PropertyForm = ({
  property,
  setProperty,
  action,
  setToast,
  setProperties,
  properties,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const backend = useBackend()
  const [loanedTo, setLoanedTo] = useState<User | null>(null)

  useEffect(() => {
    setLoanedTo(property.loanedTo as User)
  }, [property])

  const createProperty = async () => {
    if (loanedTo) setProperty({ ...property, loanedTo: loanedTo })
    try {
      const res = await backend.post("/admin/property", { ...property, loanedTo })
      setProperties([...properties, res.data.property])
      setToast("Propriedade criada com sucesso!")
    } catch {
      setToast("Erro ao criar propriedade.")
    }
  }

  const editProperty = async () => {
    try {
      const res = await backend.put(`/admin/property/${property.id}`, {
        ...property,
        loanedTo,
      })
      setProperties(properties.map((p) => (p.id == property.id ? res.data.property : p)))
      setToast("Propriedade editada com sucesso!")
    } catch {
      setToast("Erro ao editar propriedade.")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Verify if all fields are filled
    if (!property.name || !property.type) {
      setToast("Preencha todos os campos!")
      setIsLoading(false)
      return
    }
    switch (action) {
      case "create":
        await createProperty()
        break
      case "edit":
        await editProperty()
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
          placeholder="Nome do Bem (propiedade)"
          size="md"
          value={property.name}
          onChange={(e) => setProperty({ ...property, name: e.target.value })}
          color="primary"
          disabled={isLoading}
          bordered
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Tipo</span>
        </div>
        <Input
          placeholder="Tipo de Bem (notebook, mesa, etc.)"
          size="md"
          value={property.type}
          onChange={(e) => setProperty({ ...property, type: e.target.value })}
          color="primary"
          disabled={isLoading}
          bordered
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Emprestado</span>
        </div>

        <UserSearchInput
          placeholder="Emprestado para..."
          targetUser={loanedTo}
          setTargetUser={setLoanedTo}
          size="md"
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

export default PropertyForm
