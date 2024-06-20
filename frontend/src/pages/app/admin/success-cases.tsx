import { ConfirmModal } from "@/components/ConfirmModal"
import Loading from "@/components/Loading"
import Toast from "@/components/Toast"
import SuccessCaseModal from "@/components/app/admin/lp/SuccessCaseModal"
import { useSuccessCases, useSuccessCasesMutations } from "@/hooks/admin/lp"
import { withAuth } from "@/utils/auth"
import { useState } from "react"
import { Alert, Button, Table, Tooltip } from "react-daisyui"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"

const SuccessCases = () => {
  const [toast, setToast] = useState("")

  const [modalAction, setModalAction] = useState<"edit" | "create">("edit")
  const [targetCaseIndex, setTargetCaseIndex] = useState<number>(-1)

  const { data: successCases = [], isLoading, error } = useSuccessCases()

  const { deleteMutation } = useSuccessCasesMutations()

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
            {error.message}
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
                      <ConfirmModal
                        title="Excluir Caso de Sucesso"
                        description="Tem certeza que deseja excluir este caso de sucesso?"
                      >
                        {(show) => (
                          <Button
                            color="error"
                            size="sm"
                            onClick={show(() => deleteMutation.mutate(successCase.id))}
                          >
                            <FaTrash />
                          </Button>
                        )}
                      </ConfirmModal>
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
              Nenhum caso de sucesso encontrado. Clique no botão abaixo para criar um :D
            </Alert>
          </div>
        )}
      </div>

      <Tooltip
        message="Adicionar Caso de Sucesso"
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
