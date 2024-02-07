import { EXPENSE_LOG_QUERY_TYPES } from "@/data/translations"
import { ExpenseLogType } from "@/types/finance"
import { ExpenseLogQuery } from "@/types/queries"
import { Input, Join, Select } from "react-daisyui"

type Props = {
  query: ExpenseLogQuery
  setQuery: React.Dispatch<React.SetStateAction<ExpenseLogQuery>>
}

const ExpenseLogFilter = ({ query, setQuery }: Props) => {
  return (
    <div className="flex justify-center my-2">
      <Join>
        <Input
          size="sm"
          value={query.category}
          onChange={(e) => setQuery({ ...query, category: e.target.value.trim() })}
          placeholder="Categoria"
          className="join-item"
          bordered
        />
        <Input
          size="sm"
          value={query.addedBy}
          onChange={(e) => setQuery({ ...query, addedBy: e.target.value.trim() })}
          placeholder="Adicionado por"
          className="join-item"
          bordered
        />
        <Input
          size="sm"
          value={query.comment}
          onChange={(e) => setQuery({ ...query, comment: e.target.value.trim() })}
          placeholder="Comentário"
          className="join-item"
          bordered
        />
        <Input
          size="sm"
          value={query.paidTo}
          onChange={(e) => setQuery({ ...query, paidTo: e.target.value.trim() })}
          placeholder="Pago para"
          className="join-item"
          bordered
        />
        <Select
          size="sm"
          className="join-item"
          value={query.type}
          onChange={(e) =>
            setQuery({ ...query, type: e.target.value as ExpenseLogQuery["type"] })
          }
        >
          {Object.keys(EXPENSE_LOG_QUERY_TYPES).map((k, i) => (
            <Select.Option key={i} value={k}>
              {EXPENSE_LOG_QUERY_TYPES[k as ExpenseLogType]}
            </Select.Option>
          ))}
        </Select>

        {/* TODO: Add date picker with start and end date filters */}
      </Join>
    </div>
  )
}

export default ExpenseLogFilter
