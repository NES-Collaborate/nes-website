import { Logo } from "@/components/Logo"
import { Footer } from "@/components/nes/Footer"
import { Content } from "@/components/nes/about/learn-more/Content"
import { Button } from "@/components/Button"

const Home = () => {
  return (
    <>
      <div className="mb-2 max-h-96 overflow-hidden">
        <Logo
          type="mathBanner"
          className="w-full object-cover object-center"
          alt="Banner do NES"
        />
      </div>

      <Content />

      <div className="flex flex-wrap w-full justify-evenly mb-4">
        <Button
          type="navigation"
          style="fill"
          color="secondary"
          className="btn-lg w-2/5 my-4"
          href="/nes/about/success-cases"
        >
          Conheça Histórias de Sucesso
        </Button>
        <Button
          type="navigation"
          style="fill"
          color="secondary"
          className="btn-lg w-2/5 my-4"
          href="/nes/about/curriculum"
        >
          Conheça a Grade Currícular
        </Button>
      </div>

      <Footer />
    </>
  )
}

export default Home
