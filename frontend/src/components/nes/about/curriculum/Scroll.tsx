import Link from "next/link";

/**
 * Buttons to scroll to the sections
 * @returns {JSX.Element} Scroll
 */
export const Scroll = () => {
  return (
    <div className="w-full flex flex-col items-center my-4">
      <h1 className="text-purple-nes text-3xl stroke-1 mb-4">Grade Curricular</h1>
      <div className="mt-8 w-full flex justify-evenly">
        <Link className="btn btn-outline text-lg text-green-nes hover:bg-green-nes w-2/5" href="#FuncionamentoPedagogico">Funcionamento Pedagógico</Link>
        <Link className="btn btn-outline text-lg text-green-nes hover:bg-green-nes w-2/5" href="#Modulos">Módulos</Link>
      </div>
    </div>
  )
}