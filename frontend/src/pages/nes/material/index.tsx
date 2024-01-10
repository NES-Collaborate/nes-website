import Logo from "@/components/Logo"
import Footer from "@/components/nes/Footer"
import Materials from "@/components/nes/material/Materials"

const Home = () => {
  return (
    <>
      <div className="mb-4 overflow-hidden">
        <Logo
          type="library"
          className="w-full max-h-72 object-cover object-center"
          alt="Banner do NES"
        />
      </div>

      <Materials />

      <Footer />
    </>
  )
}

export default Home
