import Image from "next/image"
import { Logo } from "@/components/Logo"
import { Footer } from "@/components/nes/Footer"
import Link from "next/link"
import { Scroll } from "@/components/nes/about/curriculum/Scroll"
import { Content } from "@/components/nes/about/curriculum/Content"

const Home = () => {
  return (
    <>
      <div className="max-h-96 overflow-hidden">
        <Logo type="library" className="w-full max-h-96 object-cover object-center" alt="Banner do NES" />
      </div>

      <Scroll/>

      <Content/>

      <Footer />
    </>
  )
}

export default Home
