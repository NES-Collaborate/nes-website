import { SELECTIONS_EXAMPLES, Selection, Student } from "@/data/constants"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

/**
 * Table with the results of a selection
 * @returns {JSX.Element} Table
 */
const Table = () => {
  const router = useRouter()
  const { selectionYear } = router.query
  const [selection, setSelection] = useState<Selection>()
  const [filteredStudents, setFilteredStudents] = useState<Student[] | undefined>([])

  useEffect(() => {
    const selected = SELECTIONS_EXAMPLES.find(
      (selection) => selection.year === selectionYear
    )

    if (selected) {
      setSelection(selected)
      setFilteredStudents(selected.results)
    }
  }, [selectionYear])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    const newFilteredStudents: Student[] | undefined = selection?.results.filter(
      (student) =>
        student.name.toLowerCase().includes(value.toLowerCase()) ||
        student.city.toLowerCase().includes(value.toLowerCase()) ||
        student.UF.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredStudents(newFilteredStudents)
  }

  return (
    <div className="flex flex-col items-center">
      <label className="form-control w-5/6 mb-8">
        <input
          type="text"
          placeholder="Pesquisar"
          className="input input-bordered input-primary w-full"
          onChange={handleChange}
        />
      </label>

      <table className="w-5/6 border">
        <thead>
          <tr className="bg-primary text-gray-300">
            <th className="border border-primary">Nome</th>
            <th className="border border-primary">Município</th>
            <th className="border border-primary">UF</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents?.map((student, i) => {
            return (
              <tr key={i} className="text-center">
                <td className="border border-primary">{student.name}</td>
                <td className="border border-primary">{student.city}</td>
                <td className="border border-primary">{student.UF}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
