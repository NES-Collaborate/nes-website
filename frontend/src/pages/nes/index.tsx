import { Logo } from "@/components/Logo"
import { Footer } from "@/components/nes/Footer"
import { Brief } from "@/components/nes/home/Brief"
import { MoreInfos } from "@/components/nes/home/MoreInfos"
import { Notices } from "@/components/nes/home/Notices"
import Link from "next/link"

const Home = () => {
  return (
    <>
      <div className="mb-4">
        <Logo type="banner" className="w-full" alt="Banner do NES" />
      </div>

      <Brief />

      <Link href="/nes/subscription" className="my-4">
        <Logo type="bannerProcessoSeletivo" size={500} className="mx-auto w-4/5" />
      </Link>

      <Notices />

      <MoreInfos />

      <Footer />
    </>
  )
}

export default Home
