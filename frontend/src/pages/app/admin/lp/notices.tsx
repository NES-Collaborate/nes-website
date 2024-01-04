import { Loading } from "@/components/Loading"
import { EditNoticeModal } from "@/components/app/admin/lp/notices/EditNoticeModal"
import { Notice } from "@/types/constants"
import { withAuth } from "@/utils/auth"
import { axiosApi } from "@/utils/axiosClient"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Alert,
  Button,
  FileInput,
  Input,
  Modal,
  Table,
  Textarea,
  Tooltip,
} from "react-daisyui"
import { FaEdit, FaTrash } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([])
  const [targetNoticeEdit, setTargetNoticeEdit] = useState<Notice | null>(null)
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
                      onClick={() => setTargetNoticeEdit(notice)}
                      color="primary"
                      size="sm"
                    >
                      <FaEdit />
                    </Button>
                  </Tooltip>

                  <Tooltip message="Excluir">
                    <Button color="error" size="sm">
                      <FaTrash />
                    </Button>
                  </Tooltip>
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <EditNoticeModal notice={targetNoticeEdit} setNotice={setTargetNoticeEdit} />
      </div>
    </>
  )
}

export default Notices

export const getServerSideProps = withAuth()
