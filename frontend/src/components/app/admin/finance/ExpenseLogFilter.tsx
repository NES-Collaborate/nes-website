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
    <Join>
      <Input
        size="sm"
        value={query.input}
        onChange={(e) => setQuery({ ...query, input: e.target.value.trim() })}
        placeholder="Pesquisar..."
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
  )
}

export default ExpenseLogFilter
