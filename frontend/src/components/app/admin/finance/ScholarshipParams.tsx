import { useBackend } from "@/contexts/backend"
import { Classroom } from "@/types/entities"
import { ScholarshipQuery } from "@/types/queries"
import { useEffect, useMemo, useState } from "react"

type Props = {
  query: ScholarshipQuery
  setQuery: React.Dispatch<React.SetStateAction<ScholarshipQuery>>
}

const ScholarshipParams = ({ query, setQuery }: Props) => {
  const { backend, isLogged } = useBackend()
  const currentDate = useMemo(() => new Date(), [])

  useEffect(() => {
    setQuery({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      classroomId: 0,
    })
  }, [currentDate, setQuery])

  const [isLoading, setIsLoading] = useState(true)
  const [classrooms, setClassrooms] = useState<Classroom[]>([])

  useEffect(() => {
    setIsLoading(true)
    const fetchClassrooms = async () => {
      if (!isLogged) return
      try {
        const res = await backend.get("/teacher/classrooms")
        setClassrooms(res.data)
      } catch {
        // TODO: Set some error message here
      }
    }
    fetchClassrooms()
    setIsLoading(false)
  }, [backend, isLogged])

  return (
    <div className="join flex justify-center">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Ano</span>
        </div>
        <input
          type="number"
          max={currentDate.getFullYear()}
          min={currentDate.getFullYear() - 5}
          value={query.year}
          onChange={(e) => setQuery({ ...query, year: parseInt(e.target.value) })}
          placeholder="Ano"
          className="input input-bordered w-full max-w-xs join-item"
          disabled={isLoading}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Mês</span>
        </div>
        <input
          type="number"
          max={1}
          min={12}
          value={query.month}
          onChange={(e) => setQuery({ ...query, month: parseInt(e.target.value) })}
          placeholder="Mês"
          className="input input-bordered w-full max-w-xs join-item"
          disabled={isLoading}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Turma</span>
        </div>
        <select
          className="select select-bordered join-item"
          onChange={(e) => setQuery({ ...query, classroomId: parseInt(e.target.value) })}
          value={query.classroomId}
          disabled={isLoading}
        >
          <option disabled selected value={0}>
            Selecione uma Turma
          </option>
          {classrooms.map((c, i) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default ScholarshipParams
