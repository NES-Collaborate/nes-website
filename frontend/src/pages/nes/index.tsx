import Logo from "@/components/Logo"
import Footer from "@/components/nes/Footer"
import Brief from "@/components/nes/home/Brief"
import MoreInfos from "@/components/nes/home/MoreInfos"
import Notices from "@/components/nes/home/Notices"
import Link from "next/link"

const Home = () => {
  return (
    <div className="min-height flex flex-col">
      <div className="flex-1">
        <div className="mb-4 overflow-hidden">
          <Logo
            type="banner"
            className="w-full max-h-72 object-cover object-center"
            alt="Banner do NES"
          />
        </div>

        <Brief />

        <Notices />

        <MoreInfos />
      </div>

      <Footer />
    </div>
  )
}

export default Home
