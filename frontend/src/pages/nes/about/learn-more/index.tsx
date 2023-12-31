import Link from "next/link"
import { Logo } from "@/components/Logo"
import { Footer } from "@/components/nes/Footer"
import { Content } from "@/components/nes/about/Content"

const Home = () => {
  return (
    <>
      <div className="mb-4 max-h-96 overflow-hidden">
        <Logo type="mathBanner" className="w-full max-h-96 object-cover object-center" alt="Banner do NES" />
      </div>

      <Content/>

      <div className="flex flex-wrap w-full justify-evenly mb-4">
        <Link
          href="/nes/about/success-cases"
          className="btn btn-lg bg-green-nes text-gray-300 w-2/5 hover:bg-hover-purple-nes my-4"
        >
          Conheça Histórias de Sucesso
        </Link>
        <Link
          href="/nes/about/curriculum"
          className="btn btn-lg bg-green-nes text-gray-300 w-2/5 hover:bg-hover-purple-nes my-4"
        >
          Conheça a Grade Currícular
        </Link>
      </div>

      <Footer />
    </>
  )
}

export default Home
