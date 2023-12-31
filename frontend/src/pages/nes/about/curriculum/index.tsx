import { Logo } from "@/components/Logo"
import { Footer } from "@/components/nes/Footer"
const Home = () => {
  return (
    <>
      <div className="mb-4 max-h-96 overflow-hidden">
        <Logo type="banner" className="w-full max-h-96 object-cover object-center" alt="Banner do NES" />
      </div>

      <div className="flex flex-col w-full items-center mb-4">
        <h1 className="text-xl">/nes/about/curriculum</h1>
        <p>Aqui será descrita a grade currícular</p>
      </div>

      <Footer />
    </>
  )
}

export default Home
