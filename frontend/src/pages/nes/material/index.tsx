import Logo from "@/components/Logo"
import Footer from "@/components/nes/Footer"
import Materials from "@/components/nes/material/Materials"

const Home = () => {
  return (
    <div className="min-height flex flex-col">
      <div className="flex-1">
        <div className="mb-4 overflow-hidden">
          <Logo
            type="library"
            className="w-full max-h-72 object-cover object-center"
            alt="Banner do NES"
          />
        </div>

        <div className="w-full flex flex-col items-center">
          <h1 className="text-primary text-3xl stroke-1 mb-4 text-center">
            Material Gratuito
          </h1>
        </div>

        <Materials />
      </div>

      <Footer />
    </div>
  )
}

export default Home
