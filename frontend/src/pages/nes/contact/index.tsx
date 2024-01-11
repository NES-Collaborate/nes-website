import Logo from "@/components/Logo"
import Footer from "@/components/nes/Footer"
import Contacts from "@/components/nes/contact/Contacts"

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

        <div className="w-full flex flex-col items-center my-4">
          <h1 className="text-primary text-3xl stroke-1 mb-4">Contatos</h1>
        </div>

        <Contacts />
      </div>

      <Footer />
    </div>
  )
}

export default Home
