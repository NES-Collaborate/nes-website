import Link from "next/link"

export const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center bg-purple-700">
      <Link href={"/nes/about"} className="btn btn-ghost text-2xl text-gray-300 hover:bg-purple-700 mt-4 mb-2">
        Contato
      </Link>
      <Link href={"mailto:nes.alagoas@gmail.com"} className="btn-link text-lg text-gray-300 hover:bg-purple-700 mb-4">
        nes.alagoas@gmail.com
      </Link>
    </div>      
  )
}
