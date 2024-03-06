import { useBackend } from "@/contexts/backend"
import { useExpenseLogs } from "@/contexts/expenseLogs"
import { useSession } from "@/contexts/session"
import { ExpenseLog } from "@/types/finance"
import { maskMoney, uploadAttach } from "@/utils/client"
import clsx from "clsx"
import { useRef, useState } from "react"
import { Alert, Button, FileInput, Input, Swap, Tooltip } from "react-daisyui"
import { FaPlus } from "react-icons/fa"
import { IoIosInformationCircle } from "react-icons/io"

type Props = {
  toggle: () => void
}

const ExpenseLogForm = ({ toggle }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [proof, setProof] = useState<number | null>(null)
  const { logs, setLogs } = useExpenseLogs()
  const { backend } = useBackend()
  const { token } = useSession()

  const inputRefs = {
    value: useRef<HTMLInputElement>(null),
    category: useRef<HTMLInputElement>(null),
    comment: useRef<HTMLInputElement>(null),
  }

  const [money, setMoney] = useState("")
  const [type, setType] = useState("Removal")

  const toggleType = (e: any) => {
    setType(() => (e.target.checked ? "Deposit" : "Removal"))
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

      form["category"] = { id: 0, name: form["category"], description: "" }
      form["value"] = money.replace(".", "").replace(",", ".")
      form["proof"] = proof
      form["type"] = type

      const res = await backend.post("/admin/finance", form)

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
      const attach = await uploadAttach(file, token)
      if (typeof attach === "string") {
        setError(attach)
        setIsLoading(true)
      } else {
        setProof(attach.id || null)
        setIsLoading(false)
        setError("")
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {error && <Alert status="error">{error}</Alert>}
      <InputField
        value={money}
        onChange={(e: any) => setMoney(maskMoney(e.target.value))}
        label="Valor (R$)"
      />
      <InputField
        inputRef={inputRefs.category}
        label="Categoria"
        message="Caso não exista será criada uma com o nome informado."
      />
      <SwapField label="Tipo" onChange={toggleType} />

      <InputField
        inputRef={inputRefs.comment}
        label="Comentário"
        message="Caso queira adicionar alguma informação adicional."
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

const SwapField = ({ inputRef, label, options, ...rest }: any) => (
  <div className="form-control w-full max-w-xs">
    <label>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
    </label>
    <Swap
      className="input input-primary !outline-none"
      onElement="Entrada"
      offElement="Saída"
      {...rest}
    />
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
