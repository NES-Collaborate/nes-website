import Loading from "@/components/Loading"
import Toast from "@/components/Toast"
import SuccessCaseModal from "@/components/app/admin/lp/SuccessCaseModal"
import { SuccessCase } from "@/types/constants"
import { withAuth } from "@/utils/auth"
import { axiosApi } from "@/utils/axiosClient"
import { useEffect, useState } from "react"
import { Alert, Button, Table, Tooltip } from "react-daisyui"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"

const SuccessCases = () => {
  const [successCases, setSuccessCases] = useState<SuccessCase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState("")
  const [error, setError] = useState("")

  const [modalAction, setModalAction] = useState<"edit" | "create">("edit")
  const [targetCaseIndex, setTargetCaseIndex] = useState<number>(-1)

  // Load Success Cases
  useEffect(() => {
    setIsLoading(true)
    axiosApi
      .get("/success-case/all")
      .then((res) => setSuccessCases(res.data.successCases || []))
      .catch(() => setError("Erro ao buscar casos de sucesso"))
      .finally(() => setIsLoading(false))
  }, [])

  // Delete Success Case
  const deleteSuccessCase = async (successCase: SuccessCase) => {
    try {
      await axiosApi.delete(`/success-case/${successCase.id}`)
      setSuccessCases(successCases.filter((n) => n.id !== successCase.id))
      setToast(`Caso de Sucesso do(a) '${successCase.name}' deletado com sucesso!`)
    } catch (error) {
      setError("Erro ao deletar caso de sucesso")
    }
  }

  const openCreateModal = () => {
    setTargetCaseIndex(-1)
    setModalAction("create")
  }

  const openEditModal = (index: number) => {
    setTargetCaseIndex(index)
    setModalAction("edit")
  }

  return (
    <>
      <h1 className="text-2xl text-center my-1">Gestão de Casos de Sucesso</h1>

      {error && (
        <div className="flex justify-center items-center h-80">
          <Alert status="error" className="w-4/5" icon={<MdErrorOutline />}>
            {error}
          </Alert>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-80">
          <Loading text="Buscando casos de sucesso..." />
        </div>
      )}

      <div className="overflow-x-auto flex justify-center">
        {successCases.length > 0 && (
          <Table zebra>
            <Table.Head className="text-center">
              <span>ID</span>
              <span>Nome</span>
              <span>Cidade - Estado</span>
              <span>Resultados</span>
              <span>Dificuldades</span>
              <span>Frase Pessoal</span>
              <span>Ações</span>
            </Table.Head>
            <Table.Body className="text-center">
              {successCases.map((successCase) => (
                <Table.Row key={successCase.id}>
                  <span>{successCase.id}</span>
                  <span>{successCase.name}</span>
                  <span>{successCase.city}</span>
                  <span>{successCase.results}</span>
                  <span>{successCase.difficulties}</span>
                  <span>{successCase.phrase}</span>
                  <span className="flex gap-2 justify-center">
                    <Tooltip message="Editar">
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => openEditModal(successCase.id)}
                      >
                        <FaEdit />
                      </Button>
                    </Tooltip>

                    <Tooltip message="Excluir">
                      <Button
                        color="error"
                        size="sm"
                        onClick={() => deleteSuccessCase(successCase)}
                      >
                        <FaTrash />
                      </Button>
                    </Tooltip>
                  </span>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}

        {successCases.length == 0 && !error && (
          <div className="flex justify-center items-center h-80">
            <Alert status="info" className="w-full" icon={<MdErrorOutline />}>
              Nenhum caso de sucesso encontrada. Clique no botão abaixo para criar um :D
            </Alert>
          </div>
        )}
      </div>

      <Tooltip
        message="Adicionar Notícia"
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

      <SuccessCaseModal
        successCases={successCases}
        setSuccessCases={setSuccessCases}
        action={modalAction}
        index={targetCaseIndex}
        setIndex={setTargetCaseIndex}
        setToast={setToast}
      />
    </>
  )
}

export default SuccessCases

export const getServerSideProps = withAuth({ allowedUsers: ["admin"] })
