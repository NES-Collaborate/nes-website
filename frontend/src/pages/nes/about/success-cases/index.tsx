import { Logo } from "@/components/Logo"
import { Brief } from "@/components/nes/about/Brief"
import { SuccessCase } from "@/components/nes/about/SuccessCase"
import { Footer } from "@/components/nes/Footer"

const Home = () => {
  return (
    <>
      <div className="mb-4 max-h-96 overflow-hidden">
        <Logo type="obmepMedals" className="w-full max-h-96 object-cover object-center" alt="Banner do NES" />
      </div>

      <Brief/>

      <SuccessCase
        imagePath="/img/circle.png"
        name="Irineu da Silva Cabral"
        city="Boca da Mata, Alagoas, Brasil"
        results="Esse é um texto dizendo um monte de coisa que o Irineu ganhou ou fez na vida"
        difficulties="Esse é um texto dizendo um monte de coisa que dificultou a vida do Irineu"
        phrase="Essa frase é emocionante! Essa frase é emocionante! Essa frase é emocionante! Essa frase é emocionante!"
      />
      <SuccessCase 
        imagePath="/img/circle.png"
        name="Irineuza Cabral da Silva"
        city="Maceió, Alagoas, Brasil"
        results="Esse é um texto dizendo um monte de coisa que o Irineuza ganhou ou fez na vida"
        difficulties="Esse é um texto dizendo um monte de coisa que dificultou a vida da Irineuza"
        phrase="Uma frase muito bonita! Uma frase muito bonita! Uma frase muito bonita! Uma frase muito bonita!"
        type="reverse"
      />

      <Footer />
    </>
  )
}

export default Home
