import Logo from "@/components/Logo"
import Footer from "@/components/nes/Footer"
import Selections from "@/components/nes/subscription/Selections"

const Home = () => {
  return (
    <div className="min-height flex flex-col">
      <div className="flex-1">
        <div className="mb-4 overflow-hidden">
          <Logo
            type="bannerProcessoSeletivo"
            className="w-full max-h-72 object-cover object-center"
            alt="Banner do NES"
          />
        </div>

        <Selections />
      </div>

      <Footer />
    </div>
  )
}

export default Home
