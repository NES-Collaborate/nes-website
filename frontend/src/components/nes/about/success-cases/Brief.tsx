import Link from "next/link"

/**
 * Page Explanation
 * @returns {JSX.Element} Brief
 */
export const Brief = () => {
  return (
    <div className="w-full flex flex-col items-center my-4">
      <h1 className="text-purple-nes text-3xl stroke-1 mb-4">Casos de Sucesso</h1>
      <p className="text-lg italic text-center w-3/4 mb-4">
        Estes são alguns casos de sucesso de alunos do NES que fizeram grandes conquistas
        no decorrer de sua trajetória
      </p>
      <Link
        href="/nes/about"
        className="btn btn-lg bg-purple-nes text-gray-300 hover:bg-hover-purple-nes my-4"
      >
        Saiba mais sobre o NES
      </Link>
    </div>
  )
}
