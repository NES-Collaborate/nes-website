import Link from "next/link"

/**
 * Footer of the project (should only be used on the landing page)
 * @returns {JSX.Element} Footer
 */
export const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center bg-purple-nes">
      <Link
        href="/nes/about"
        className="btn btn-ghost text-2xl text-gray-300 hover:bg-purple-nes mt-4 mb-2"
      >
        Contato
      </Link>
      <Link
        href="mailto:nes.alagoas@gmail.com"
        className="btn-link text-lg text-gray-300 hover:bg-purple-nes mb-4"
      >
        nes.alagoas@gmail.com
      </Link>
    </div>
  )
}
