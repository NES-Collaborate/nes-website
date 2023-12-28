import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/nes/footer"
import Notice from "@/components/nes/home/notice"
import { NOTICES } from "@/data/constants"

const Home = () => {
  return (
    <>
      <div className="mb-4">
        <Image src="/img/banner.png" width={2611} height={1003} alt="Banner do NES" className="w-full" />
      </div>
      <div className="w-full flex flex-col items-center mb-4">
        <h1 className="text-purple-700 text-2xl font-mono stroke-1 my-8">NOVO ENSINO SUPLEMENTAR</h1>
        <p className="text-lg italic text-center w-3/4 mb-4">Causando impacto no desenvolvimento científico, tecnológico e de inovação através de novos talentos para Matemática e Computação no Brasil</p>
        <Link href={"/nes/subscription"} className="my-4">
          <Image 
            src="/img/banner.gif"
            className="mx-auto w-3/4"
            width={1280}
            height={326}
            alt="Banner para inscrição no NES"
          />
        </Link>
      </div>
      <div className="w-full flex flex-col items-center mb-4">
        <h1 className="text-purple-700 text-2xl stroke-1 my-8">Notícias</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {NOTICES.map((notice, i) => {
            return  <Notice 
                      key={i}
                      targetUrl={notice.targetUrl} 
                      imageUrl={notice.imageUrl}
                      title={notice.title}
                      subtitle={notice.subtitle}
                    />
          })}
        </div>
      </div>
      <div className="w-full flex flex-col items-center mb-4">
        <h1 className="text-purple-700 text-2xl stroke-1 my-8">Missão do Projeto</h1>
        <p className="text-base italic font-mono text-center w-3/4 mb-4">CRIAR UM CENTRO DE EXCELÊNCIA NA FORMAÇÃO DE TALENTOS PARA AS ÁREAS DE EXATAS</p>
        <p className="text-base italic font-mono text-center w-3/4 mb-4">REUNINDO OS MELHORES ESTUDANTES DE ALAGOAS EM CURSOS AVANÇADOS E ATIVIDADES NO CONTRA-TURNO DE SUAS ESCOLAS</p>
        <p className="text-base italic font-mono text-center w-3/4 mb-4">COM O OBJETIVO DE FORMÁ-LOS PARA CONTINUAREM SEUS ESTUDOS NAS MELHORES UNIVERSIDADES DO MUNDO</p>
        <Link href={"/nes/about"} className="btn btn-lg bg-purple-700 text-gray-300 hover:bg-purple-800 my-4">
          Saiba mais sobre o NES
        </Link>
      </div>
      <Footer/>
    </>
  )
}

export default Home
