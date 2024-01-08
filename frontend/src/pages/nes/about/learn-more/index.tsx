import { ButtonNES } from "@/components/ButtonNES"
import { Logo } from "@/components/Logo"
import { Footer } from "@/components/nes/Footer"
import { Content } from "@/components/nes/about/learn-more/Content"

const Home = () => {
  return (
    <>
      <div className="mb-4 overflow-hidden">
        <Logo
          type="mathBanner"
          className="w-full max-h-72 object-cover object-center"
          alt="Banner do NES"
        />
      </div>

      <Content />

      <div className="flex flex-wrap w-full justify-evenly mb-4">
        <ButtonNES
          type="navigation"
          style="fill"
          className="btn-lg w-2/5 my-4 !pl-4"
          href="/nes/about/success-cases"
        >
          Conheça Histórias de Sucesso
        </ButtonNES>
        <ButtonNES
          type="navigation"
          style="fill"
          className="btn-lg w-2/5 my-4"
          href="/nes/about/curriculum"
        >
          Conheça a Grade Currícular
        </ButtonNES>
      </div>

      <Footer />
    </>
  )
}

export default Home
