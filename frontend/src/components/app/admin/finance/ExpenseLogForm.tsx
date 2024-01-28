import { useSession } from "@/contexts/session"
import { EXPENSE_LOG_QUERY_TYPES } from "@/data/translations"
import { ExpenseLog } from "@/types/finance"
import { axiosServer } from "@/utils/axiosClient"
import { useRef, useState } from "react"
import { Button, FileInput, Input, Select, Tooltip } from "react-daisyui"
import { FaPlus } from "react-icons/fa"
import { IoIosInformationCircle } from "react-icons/io"

type Props = {
  toggle: () => void
}
const ExpenseLogForm = ({ toggle }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()

  const inputRefs = {
    value: useRef<HTMLInputElement>(null),
    category: useRef<HTMLInputElement>(null),
    type: useRef<HTMLSelectElement>(null),
    comment: useRef<HTMLInputElement>(null),
  }
  const inputProofRef = useRef<HTMLInputElement>(null)
  // TODO: Add form fields verification

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const form = new FormData()
      for (const key in inputRefs) {
        const ref = inputRefs[key as keyof typeof inputRefs]
        if (ref.current) {
          form.append(key, ref.current.value)
        }
      }
      if (inputProofRef.current && inputProofRef.current.files) {
        form.append("proof", inputProofRef.current.files[0])
      }

      const res = await axiosServer.post("/admin/finance", form, {
        headers: {
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      toggle()
    } catch {
      // TODO: Set some error message to frontend
      console.error("Failed to submit expense log")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="form-control w-full max-w-xs">
        <label>
          <div className="label">
            <span className="label-text">Valor (R$)</span>
          </div>
        </label>
        <Input
          ref={inputRefs.value}
          placeholder="0.00"
          size="md"
          type="number"
          min={0}
          step={0.01}
          color="primary"
          disabled={isLoading}
          bordered
        />
      </div>

      {/* TODO: Make this a select with loaded categories and add the possibility to add new without leave main modal. */}
      <div className="form-control w-full max-w-xs">
        <label>
          <div className="label">
            <span className="label-text flex items-center">
              <p className="mr-1">Categoria</p>
              <Tooltip message="Caso não exista será criada uma nova com o nome informado.">
                <IoIosInformationCircle size={17} />
              </Tooltip>
            </span>
          </div>
        </label>
        <Input
          ref={inputRefs.category}
          placeholder="Transporte"
          size="md"
          color="primary"
          disabled={isLoading}
          bordered
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label>
          <div className="label">
            <span className="label-text">Tipo</span>
          </div>
        </label>
        <Select
          ref={inputRefs.type}
          size="md"
          color="primary"
          disabled={isLoading}
          bordered
        >
          {Object.keys(EXPENSE_LOG_QUERY_TYPES).map((k, i) => {
            return k !== "all" ? (
              <Select.Option key={i} value={k}>
                {EXPENSE_LOG_QUERY_TYPES[k as ExpenseLog["type"]]}
              </Select.Option>
            ) : (
              <></>
            )
          })}
        </Select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label>
          <div className="label">
            <span className="label-text flex items-center">
              <p className="mr-1">Comentário</p>
            </span>
          </div>
        </label>
        <Input
          ref={inputRefs.comment}
          placeholder="Pão, 1x R$ 5.00"
          size="md"
          color="primary"
          disabled={isLoading}
          bordered
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label>
          <div className="label">
            <span className="label-text flex items-center">
              <p className="mr-1">Comprovante</p>
            </span>
          </div>
        </label>
        <FileInput
          ref={inputProofRef}
          size="md"
          color="primary"
          disabled={isLoading}
          bordered
        />
      </div>

      <Button variant="outline" color="accent" onClick={handleSubmit}>
        <FaPlus /> Inserir
      </Button>
    </div>
  )
}

export default ExpenseLogForm
