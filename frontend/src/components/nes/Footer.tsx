import { Button } from "../Button"

/**
 * Footer of the project (should only be used on the landing page)
 * @returns {JSX.Element} Footer
 */
export const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center bg-primary">
      <Button
        type="navigation"
        style="ghost"
        color="primary"
        className="text-2xl mt-4 mb-2"
        href="/nes/about"
      >
        Contato
      </Button>
      <Button
        type="navigation"
        style="link"
        color="primary"
        className="text-lg mb-4"
        href="mailto:nes.alagoas@gmail.com"
      >
        nes.alagoas@gmail.com
      </Button>
    </div>
  )
}
