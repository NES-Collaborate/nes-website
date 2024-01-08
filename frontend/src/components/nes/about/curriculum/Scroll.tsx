import ButtonNES from "@/components/ButtonNES"

/**
 * Buttons to scroll to the sections
 * @returns {JSX.Element} Scroll
 */
const Scroll = () => {
  return (
    <div className="w-full flex flex-col items-center my-2">
      <h1 className="text-primary text-4xl stroke-1 mb-4">Grade Curricular</h1>
      <div className="mt-2 w-full flex justify-evenly">
        <ButtonNES
          type="navigation"
          style="fill"
          className="btn-lg w-2/5 my-4"
          href="#FuncionamentoPedagogico"
        >
          Funcionamento Pedagógico
        </ButtonNES>
        <ButtonNES
          type="navigation"
          style="fill"
          className="btn-lg w-2/5 my-4"
          href="#Modulos"
        >
          Módulos
        </ButtonNES>
      </div>
    </div>
  )
}

export default Scroll
