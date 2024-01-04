import { ButtonNES } from "@/components/ButtonNES"

/**
 * Page Explanation
 * @returns {JSX.Element} Brief
 */
export const Brief = () => {
  return (
    <div className="w-full flex flex-col items-center my-4">
      <h1 className="text-primary text-3xl stroke-1 mb-4">Casos de Sucesso</h1>
      <p className="text-lg italic text-center w-3/4 mb-4">
        Estes são alguns casos de sucesso de alunos do NES que fizeram grandes conquistas
        no decorrer de sua trajetória
      </p>
      <ButtonNES type="navigation" style="fill" className="btn-lg my-4" href="/nes/about">
        Saiba mais sobre o NES
      </ButtonNES>
    </div>
  )
}
