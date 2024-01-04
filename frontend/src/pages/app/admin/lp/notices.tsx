import { Loading } from "@/components/Loading"
import { CreateNoticeModal } from "@/components/app/admin/lp/notices/CreateNoticeModal"
import { EditNoticeModal } from "@/components/app/admin/lp/notices/EditNoticeModal"
import { Notice } from "@/types/constants"
import { withAuth } from "@/utils/auth"
import { axiosApi } from "@/utils/axiosClient"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Alert, Button, Table, Tooltip } from "react-daisyui"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([])
  const [NoticeEdit, setNoticeEdit] = useState<Notice | null>(null)
  const [createNotice, setCreateNotice] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axiosApi
      .get("/notice/all")
      .then((res) => setNotices(res.data.notices))
      .catch(() => setError("Erro ao buscar notícias"))
      .finally(() => setIsLoading(false))
  }, [])

  // TODO: Add feeedback when deleting and when the notice is deleted
  const deleteNotice = async (notice: Notice) => {
    try {
      await axiosApi.delete(`/notice/${notice.id}`)
      setNotices(notices.filter((n) => n.id !== notice.id))
    } catch (error) {
      setError("Erro ao deletar notícias")
    }
  }

  return (
    <>
      <h1 className="text-2xl text-center my-1">Gestão de Notícias</h1>

      {error && (
        <div className="flex justify-center items-center h-80">
          <Alert status="error" className="w-4/5" icon={<MdErrorOutline />}>
            {error}
          </Alert>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-80">
          <Loading text="Buscando notícias..." />
        </div>
      )}

      <div className="overflow-x-auto flex justify-center">
        <Table zebra>
          <Table.Head className="text-center">
            <span>ID</span>
            <span>Título</span>
            <span>Descrição</span>
            <span>URL</span>
            <span>Ações</span>
          </Table.Head>
          <Table.Body>
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
                <span className="flex gap-2">
                  <Tooltip message="Editar">
                    <Button
                      onClick={() => setNoticeEdit(notice)}
                      color="primary"
                      size="sm"
                    >
                      <FaEdit />
                    </Button>
                  </Tooltip>

                  <Tooltip message="Excluir">
                    <Button color="error" size="sm" onClick={() => deleteNotice(notice)}>
                      <FaTrash />
                    </Button>
                  </Tooltip>
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <EditNoticeModal notice={NoticeEdit} setNotice={setNoticeEdit} />
        <CreateNoticeModal open={createNotice} setOpen={setCreateNotice} />

        <Tooltip message="Adicionar notícias" className="fixed bottom-16 right-16">
          <Button
            onClick={() => setCreateNotice(true)}
            color="success"
            className="fixed bottom-5 right-5"
          >
            <FaPlus />
          </Button>
        </Tooltip>
      </div>
    </>
  )
}

export default Notices

export const getServerSideProps = withAuth()
