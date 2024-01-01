import { Logo } from "@/components/Logo"
import { Footer } from "@/components/nes/Footer"
import { Content } from "@/components/nes/about/curriculum/Content"
import { Scroll } from "@/components/nes/about/curriculum/Scroll"
import Link from "next/link"

const Home = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Logo
          type="library"
          className="w-full max-h-60 object-cover object-center"
          alt="Banner do NES"
        />
      </div>

      <Scroll />

      <Content />

      <div className="flex flex-wrap w-full justify-evenly mb-4">
        <Link
          href="/nes/about"
          className="btn btn-lg bg-purple-nes text-gray-300 hover:bg-hover-purple-nes my-4"
        >
          Saiba mais sobre o NES
        </Link>
      </div>

      <Footer />
    </>
  )
}

export default Home
