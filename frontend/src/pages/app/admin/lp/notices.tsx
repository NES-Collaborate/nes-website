import { ConfirmModal } from "@/components/ConfirmModal"
import Loading from "@/components/Loading"
import Toast from "@/components/Toast"
import NoticeModal from "@/components/app/admin/lp/NoticeModal"
import { useNoticeMutations, useNotices } from "@/hooks/admin/lp"
import { withAuth } from "@/utils/auth"
import Link from "next/link"
import { useState } from "react"
import { Alert, Button, Table, Tooltip } from "react-daisyui"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"

const Notices = () => {
  const [toast, setToast] = useState("")

  const [modalAction, setModalAction] = useState<"edit" | "create">("edit")
  const [targetNoticeIndex, setTargetNoticeIndex] = useState<number>(-1)

  const { data: notices = [], isLoading, error } = useNotices()
  const { deleteMutation } = useNoticeMutations()

  const openCreateModal = () => {
    setTargetNoticeIndex(-1)
    setModalAction("create")
  }

  const openEditModal = (index: number) => {
    setTargetNoticeIndex(index)
    setModalAction("edit")
  }

  return (
    <>
      <h1 className="text-2xl text-center my-1">Gestão de Notícias</h1>

      {error && (
        <div className="flex justify-center items-center h-80">
          <Alert status="error" className="w-4/5" icon={<MdErrorOutline />}>
            {error.message}
          </Alert>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-80">
          <Loading text="Buscando notícias..." />
        </div>
      )}

      <div className="overflow-x-auto flex justify-center">
        {notices.length > 0 && (
          <Table zebra>
            <Table.Head className="text-center">
              <span>ID</span>
              <span>Título</span>
              <span>Descrição</span>
              <span>URL</span>
              <span>Ações</span>
            </Table.Head>
            <Table.Body className="text-center">
              {notices.map((notice) => (
                <Table.Row key={notice.id}>
                  <span>{notice.id}</span>
                  <span>{notice.title}</span>
                  <span>{notice.description}</span>
                  <span>
                    <Link href={notice.url} className="link link-accent" target="_blank">
                      {notice.url}
                    </Link>
                  </span>
                  <span className="flex gap-2 justify-center">
                    <Tooltip message="Editar">
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => openEditModal(notice.id)}
                      >
                        <FaEdit />
                      </Button>
                    </Tooltip>

                    <Tooltip message="Excluir">
                      <ConfirmModal
                        title="Excluir Notícia"
                        description="Tem certeza que deseja excluir esta noticia?"
                      >
                        {(show) => (
                          <Button
                            color="error"
                            size="sm"
                            onClick={show(() => deleteMutation.mutate(notice.id))}
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

        {notices.length == 0 && !error && (
          <div className="flex justify-center items-center h-80">
            <Alert status="info" className="w-full" icon={<MdErrorOutline />}>
              Nenhuma notícia encontrada. Clique no botão abaixo para criar uma :D
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

      <NoticeModal
        action={modalAction}
        notices={notices}
        index={targetNoticeIndex}
        setIndex={setTargetNoticeIndex}
        setToast={setToast}
      />
    </>
  )
}

export default Notices

export const getServerSideProps = withAuth({ allowedUsers: ["admin"] })
