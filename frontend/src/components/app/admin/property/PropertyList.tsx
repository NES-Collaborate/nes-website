import Toast from "@/components/Toast"
import { useSession } from "@/contexts/session"
import { Property } from "@/types/entities"
import { User } from "@/types/user"
import { axiosServer } from "@/utils/axiosClient"
import { useEffect, useState } from "react"
import { Button, Table, Tooltip } from "react-daisyui"
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa"
import LoanedModal from "./LoanedModal"
import PropertyModal from "./PropertyModal"

type Props = {
  query: string
}

const PropertyList = ({ query = "" }: Props) => {
  const [data, setData] = useState<Property[]>([])
  const session = useSession()
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const debounceDelay = 500

  const [modelAction, setModelAction] = useState<"create" | "edit">("edit")
  const [targetIndex, setTargetIndex] = useState(-1)
  const [toast, setToast] = useState("")

  const [loanedTo, setLoanedTo] = useState<User | null>(null)
  const [loanedAt, setLoanedAt] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), debounceDelay)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (!session.token) return

    axiosServer
      .get("/admin/property", {
        params: {
          q: debouncedQuery,
        },
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })
      .then((res) => {
        setData(res.data.properties)
      })
      .catch(() => setData([]))
  }, [debouncedQuery, setData, session.token])

  const deleteNotice = (propertyId: number) => {
    axiosServer
      .delete(`/admin/property/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })
      .then((res) => {
        setData(data.filter((p) => p.id !== propertyId))
        setToast(res.data.message || "Propriedade excluída com sucesso!")
      })
      .catch(() => setData([]))
  }

  const openEditModal = (propertyId: number) => {
    setTargetIndex(propertyId)
    setModelAction("edit")
  }

  const openCreateModal = () => {
    setTargetIndex(-1)
    setModelAction("create")
  }

  return (
    <div className="overflow-x-auto">
      <Table zebra size="sm">
        <Table.Head className="text-center">
          <span>ID</span>
          <span>Nome</span>
          <span>Tipo</span>
          <span>Emprestado</span>
          <span>Ações</span>
        </Table.Head>

        <Table.Body>
          {data.map((property) => (
            <Table.Row key={property.id} className="text-center">
              <span>{property.id}</span>
              <span>{property.name}</span>
              <span>{property.type}</span>
              <span>
                {property.loanedTo ? (
                  <Button
                    color="success"
                    onClick={() => {
                      setLoanedTo(property.loanedTo as User)
                      setLoanedAt(property.loanedAt as string)
                    }}
                  >
                    <FaCheck />
                  </Button>
                ) : (
                  <Button color="error">
                    <FaTimes />
                  </Button>
                )}
              </span>
              <span>
                <Tooltip message="Editar">
                  <Button
                    onClick={() => openEditModal(property.id)}
                    className="mr-2"
                    color="primary"
                  >
                    <FaEdit />
                  </Button>
                </Tooltip>

                <Tooltip message="Excluir">
                  <Button onClick={() => deleteNotice(property.id)} color="error">
                    <FaTrash />
                  </Button>
                </Tooltip>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {data.length === 0 && (
        <p className="text-center text-xl my-3">Nenhum resultado encontrado</p>
      )}

      <Tooltip
        message="Adicionar Bem"
        position="left"
        className="fixed bottom-11 right-20"
      >
        <Button
          color="success"
          className="fixed bottom-5 right-5"
          onClick={openCreateModal}
        >
          <FaPlus />
        </Button>
      </Tooltip>

      <Toast message={toast} setMessage={setToast} vertical="top" />

      <PropertyModal
        properties={data}
        setProperties={setData}
        action={modelAction}
        index={targetIndex}
        setIndex={setTargetIndex}
        setToast={setToast}
      />

      <LoanedModal loanedTo={loanedTo} setLoanedTo={setLoanedTo} loanedAt={loanedAt} />
    </div>
  )
}

export default PropertyList
