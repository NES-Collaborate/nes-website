import ButtonNES from "@/components/ButtonNES"
import Logo from "@/components/Logo"
import Footer from "@/components/nes/Footer"
import Content from "@/components/nes/about/curriculum/Content"
import Scroll from "@/components/nes/about/curriculum/Scroll"

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

        <Scroll />

        <Content />

        <div className="flex flex-wrap w-full justify-evenly mb-4">
          <ButtonNES
            type="navigation"
            style="fill"
            className="btn-lg my-4"
            href="/nes/about"
          >
            Saiba mais sobre o NES
          </ButtonNES>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
