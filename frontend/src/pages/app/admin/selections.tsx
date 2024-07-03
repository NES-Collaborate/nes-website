import { ConfirmModal } from "@/components/ConfirmModal"
import Loading from "@/components/Loading"
import Toast from "@/components/Toast"
import SelectionModal from "@/components/app/admin/lp/SelectionModal"
import { useSelectionMutations, useSelections } from "@/hooks/admin/lp"
import { withAuth } from "@/utils/auth"
import Link from "next/link"
import { useState } from "react"
import { Alert, Button, Table, Tooltip } from "react-daisyui"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"

const Selections = () => {
  const [toast, setToast] = useState("")

  const [modalAction, setModalAction] = useState<"edit" | "create">("edit")
  const [targetSelectionIndex, setTargetSelectionIndex] = useState<number>(-1)

  const { data: selections = [], isLoading, error } = useSelections()
  const { deleteMutation } = useSelectionMutations()

  const openCreateModal = () => {
    setTargetSelectionIndex(-1)
    setModalAction("create")
  }

  const openEditModal = (index: number) => {
    setTargetSelectionIndex(index)
    setModalAction("edit")
  }

  return (
    <>
      <h1 className="text-2xl text-center my-1">Gestão de Processos Seletivos</h1>

      {error && (
        <div className="flex justify-center items-center h-80">
          <Alert status="error" className="w-4/5" icon={<MdErrorOutline />}>
            {error.message}
          </Alert>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-80">
          <Loading text="Buscando processos seletivos..." />
        </div>
      )}

      <div className="overflow-x-auto flex justify-start">
        {selections.length > 0 && (
          <Table zebra>
            <Table.Head className="text-center">
              <span>ID</span>
              <span>Ano</span>
              <span>Aberto para Inscrições</span>
              <span>URL do Formulário de Inscrição</span>
              <span>URL da Ementa</span>
              <span>Calendário</span>
              <span>Resultados</span>
            </Table.Head>
            <Table.Body className="text-center">
              {selections.map((selection) => (
                <Table.Row key={selection.id}>
                  <span>{selection.id}</span>
                  <span>{selection.year}</span>
                  <span>{selection.isOpen ? "Sim" : "Não"}</span>
                  <span>
                    <Link
                      href={selection.subscriptionUrl}
                      className="link link-accent"
                      target="_blank"
                    >
                      {selection.subscriptionUrl}
                    </Link>
                  </span>
                  <span>
                    <Link
                      href={selection.programUrl}
                      className="link link-accent"
                      target="_blank"
                    >
                      {selection.programUrl}
                    </Link>
                  </span>
                  <span>
                    {selection.schedule && selection.schedule[0]
                      ? selection.schedule[0].description
                      : "N/A"}
                  </span>
                  <span>
                    {selection.results && selection.results[0]
                      ? selection.results[0].name
                      : "N/A"}
                  </span>
                  <span className="flex gap-2 justify-center">
                    <Tooltip message="Editar">
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => openEditModal(selection.id)}
                      >
                        <FaEdit />
                      </Button>
                    </Tooltip>

                    <Tooltip message="Excluir">
                      <ConfirmModal
                        title="Excluir Processo Seletivo"
                        description="Tem certeza que deseja excluir este Processo Seletivo?"
                      >
                        {(show) => (
                          <Button
                            color="error"
                            size="sm"
                            onClick={show(() => deleteMutation.mutate(selection.id))}
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

        {selections.length == 0 && !error && (
          <div className="flex justify-center items-center h-80">
            <Alert status="info" className="w-full" icon={<MdErrorOutline />}>
              Nenhum processo seletivo encontrado. Clique no botão abaixo para criar um :D
            </Alert>
          </div>
        )}
      </div>

      <Tooltip
        message="Adicionar Processo Seletivo"
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

      <SelectionModal
        action={modalAction}
        selections={selections}
        index={targetSelectionIndex}
        setIndex={setTargetSelectionIndex}
        setToast={setToast}
      />
    </>
  )
}

export default Selections

export const getServerSideProps = withAuth({ allowedUsers: ["admin"] })
