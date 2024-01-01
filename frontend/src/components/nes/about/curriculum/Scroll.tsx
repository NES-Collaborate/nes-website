import Link from "next/link"

/**
 * Buttons to scroll to the sections
 * @returns {JSX.Element} Scroll
 */
export const Scroll = () => {
  return (
    <div className="w-full flex flex-col items-center my-2">
      <h1 className="text-purple-nes text-4xl stroke-1 mb-4">Grade Curricular</h1>
      <div className="mt-2 w-full flex justify-evenly">
        <Link
          className="btn btn-lg bg-green-nes text-gray-300 w-2/5 hover:bg-hover-purple-nes my-4"
          href="#FuncionamentoPedagogico"
        >
          Funcionamento Pedagógico
        </Link>
        <Link
          className="btn btn-lg bg-green-nes text-gray-300 w-2/5 hover:bg-hover-purple-nes my-4"
          href="#Modulos"
        >
          Módulos
        </Link>
      </div>
    </div>
  )
}
