import { useExpenseLogs } from "@/contexts/expenseLogs"
import { useSession } from "@/contexts/session"
import { EXPENSE_LOG_QUERY_TYPES } from "@/data/translations"
import { ExpenseLog } from "@/types/finance"
import { axiosServer } from "@/utils/axiosClient"
import { uploadAttach } from "@/utils/client"
import clsx from "clsx"
import { useRef, useState } from "react"
import { Alert, Button, FileInput, Input, Select, Tooltip } from "react-daisyui"
import { FaPlus } from "react-icons/fa"
import { IoIosInformationCircle } from "react-icons/io"

type Props = {
  toggle: () => void
}

const ExpenseLogForm = ({ toggle }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [proof, setProof] = useState<number | null>(null)
  const session = useSession()
  const { logs, setLogs } = useExpenseLogs()

  const inputRefs = {
    value: useRef<HTMLInputElement>(null),
    category: useRef<HTMLInputElement>(null),
    type: useRef<HTMLSelectElement>(null),
    comment: useRef<HTMLInputElement>(null),
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const form: Record<string, any> = {}

      for (const key in inputRefs) {
        const ref = inputRefs[key as keyof typeof inputRefs]
        if (ref.current) {
          form[key] = ref.current.value
        }
      }

      form["proof"] = proof

      const res = await axiosServer.post("/admin/finance", form, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })

      setLogs([...logs, res.data.log as ExpenseLog])
      toggle()
    } catch {
      setError("Erro ao registrar despesa. Tente novamente mais tarde.")
    }

    setIsLoading(false)
  }

  const handleProofChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsLoading(true)
      const attach = await uploadAttach(file, session.token)
      if (typeof attach === "string") {
        setError(attach)
        setIsLoading(true)
      } else {
        setProof(attach.id || null)
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {error && <Alert status="error">{error}</Alert>}
      <InputField
        inputRef={inputRefs.value}
        label="Valor (R$)"
        placeholder="0.00"
        type="number"
        min={0}
        step={0.01}
      />
      <InputField
        inputRef={inputRefs.category}
        label="Categoria"
        placeholder="Transporte"
        message="Caso não exista será criada uma com o nome informado."
      />
      <SelectField
        inputRef={inputRefs.type}
        label="Tipo"
        options={EXPENSE_LOG_QUERY_TYPES}
      />
      <InputField
        inputRef={inputRefs.comment}
        label="Comentário"
        placeholder="Pão, Queijo..."
      />
      <FileInputField label="Comprovante" onChange={handleProofChange} />
      <Button onClick={handleSubmit} disabled={isLoading}>
        <FaPlus /> Inserir
      </Button>
    </div>
  )
}

const InputField = ({ inputRef, label, message, ...rest }: any) => (
  <div className="form-control w-full max-w-xs">
    <label>
      <div className="label">
        <span className={clsx("label-text", message && "flex items-center")}>
          <p className="mr-1">{label}</p>
          {message && (
            <Tooltip message={message}>
              <IoIosInformationCircle size={17} />
            </Tooltip>
          )}
        </span>
      </div>
    </label>
    <Input ref={inputRef} size="md" color="primary" {...rest} />
  </div>
)

const SelectField = ({ inputRef, label, options, ...rest }: any) => (
  <div className="form-control w-full max-w-xs">
    <label>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
    </label>
    <Select ref={inputRef} size="md" color="primary" {...rest}>
      {Object.keys(options).map((key: string, index: number) =>
        key !== "all" ? (
          <Select.Option key={index} value={key}>
            {options[key as keyof typeof options]}
          </Select.Option>
        ) : null
      )}
    </Select>
  </div>
)

const FileInputField = ({ onChange, label, ...rest }: any) => (
  <div className="form-control w-full max-w-xs">
    <label>
      <div className="label">
        <span className="label-text flex items-center">
          <p className="mr-1">{label}</p>
        </span>
      </div>
    </label>
    <FileInput size="md" color="primary" {...rest} onChange={onChange} />
  </div>
)

export default ExpenseLogForm
