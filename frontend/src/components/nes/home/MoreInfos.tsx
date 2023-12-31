import Link from "next/link"

/**
 * More informations about the project, like mission, vision, etc.
 * @returns {JSX.Element} Informations
 */
export const MoreInfos = () => {
  return (
    <div className="w-full flex flex-col items-center mb-4">
      <h1 className="text-purple-nes text-2xl stroke-1 my-8">Missão do Projeto</h1>
      <p className="text-base italic font-mono text-center w-3/4 mb-4">
        CRIAR UM CENTRO DE EXCELÊNCIA NA FORMAÇÃO DE TALENTOS PARA AS ÁREAS DE EXATAS
      </p>
      <p className="text-base italic font-mono text-center w-3/4 mb-4">
        REUNINDO OS MELHORES ESTUDANTES DE ALAGOAS EM CURSOS AVANÇADOS E ATIVIDADES NO
        CONTRA-TURNO DE SUAS ESCOLAS
      </p>
      <p className="text-base italic font-mono text-center w-3/4 mb-4">
        COM O OBJETIVO DE FORMÁ-LOS PARA CONTINUAREM SEUS ESTUDOS NAS MELHORES
        UNIVERSIDADES DO MUNDO
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
