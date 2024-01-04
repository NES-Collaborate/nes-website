import { ButtonNES } from "../ButtonNES"

/**
 * Footer of the project (should only be used on the landing page)
 * @returns {JSX.Element} Footer
 */
export const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center bg-primary">
      <ButtonNES style="ghost" className="text-2xl mt-4 mb-2" href="/nes/about">
        Contato
      </ButtonNES>
      <ButtonNES
        type="navigation"
        style="link"
        className="text-lg mb-4"
        href="mailto:nes.alagoas@gmail.com"
      >
        nes.alagoas@gmail.com
      </ButtonNES>
    </div>
  )
}
