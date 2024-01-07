import Toast from "@/components/Toast"
import { useSession } from "@/contexts/session"
import { Property } from "@/types/entities"
import { axiosServer } from "@/utils/axiosClient"
import { useEffect, useState } from "react"
import { Button, Table, Tooltip } from "react-daisyui"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { PropertyModal } from "./PropertyModal"

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

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), debounceDelay)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (!session.token) return

    axiosServer
      .get("/admin/properties", {
        params: {
          debouncedQuery,
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
      .delete(`/admin/properties/${propertyId}`)
      .then(() => setData(data.filter((p) => p.id !== propertyId)))
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
            <Table.Row key={property.id}>
              <span>{property.id}</span>
              <span>{property.name}</span>
              <span>{property.type}</span>
              <span>{property.loanedTo ? "Sim" : "Não"}</span>
              <span>
                <Tooltip message="Editar">
                  <Button onClick={() => openEditModal(property.id)}>
                    <FaEdit />
                  </Button>
                </Tooltip>

                <Tooltip message="Excluir">
                  <Button onClick={() => deleteNotice(property.id)}>
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
    </div>
  )
}

export default PropertyList
