import Logo from "@/components/Logo"
import Footer from "@/components/nes/Footer"
import Table from "@/components/nes/subscription/results/Table"

const Home = () => {
  return (
    <div className="min-height flex flex-col">
      <div className="flex-1 mb-4">
        <div className="mb-4 overflow-hidden">
          <Logo
            type="bannerResultados"
            className="w-full max-h-72 object-cover object-center"
            alt="Banner do NES"
          />
        </div>

        <Table />
      </div>

      <Footer />
    </div>
  )
}

export default Home
