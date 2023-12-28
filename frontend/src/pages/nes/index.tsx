import Link from "next/link"
import News from "@/components/nes/home/news"
import { DEFAULT_NEWS } from "@/data/constants"

const Home = () => {
  return (
    <>
      <div className="mb-4">
        <img src="/img/banner.png" alt="Banner do NES" className="w-full" />
      </div>
      <div className="w-full flex flex-col items-center mb-4">
        <h1 className="text-purple-700 text-2xl font-mono stroke-1 my-8">NOVO ENSINO SUPLEMENTAR</h1>
        <p className="text-lg italic text-center w-3/4 mb-4">Causando impacto no desenvolvimento científico, tecnológico e de inovação através de novos talentos para Matemática e Computação no Brasil</p>
        <Link href={"/nes/subscription"} className="my-4">
          <img 
            src="https://lh5.googleusercontent.com/e3Dn7hnBE25HVel4Lij3H9-YrmYCW2i9jvdkeRALjzD2BTZRJ2-FsgTK-6FQ47h1AyfUzNzqpQgFbOeDDLbb0Vpf-1SexMzNFTMSWSWhwvc4C5o5heLKg7XU4EyDKtW23A=w1280"
            className="mx-auto w-3/4"
          />
        </Link>
      </div>
      <div className="w-full flex flex-col items-center mb-4">
        <h1 className="text-purple-700 text-2xl stroke-1 my-8">Notícias</h1>
        <div className="flex flex-wrap justify-center gap-2">
          <News 
            targetUrl={DEFAULT_NEWS.targetUrl} 
            imageUrl={DEFAULT_NEWS.imageUrl}
            title={DEFAULT_NEWS.title}
            subtitle={DEFAULT_NEWS.subtitle}
          />
          <News 
            targetUrl={DEFAULT_NEWS.targetUrl} 
            imageUrl={DEFAULT_NEWS.imageUrl}
            title={DEFAULT_NEWS.title}
            subtitle={DEFAULT_NEWS.subtitle}
          />
          <News 
            targetUrl={DEFAULT_NEWS.targetUrl} 
            imageUrl={DEFAULT_NEWS.imageUrl}
            title={DEFAULT_NEWS.title}
            subtitle={DEFAULT_NEWS.subtitle}
          />
          <News 
            targetUrl={DEFAULT_NEWS.targetUrl} 
            imageUrl={DEFAULT_NEWS.imageUrl}
            title={DEFAULT_NEWS.title}
            subtitle={DEFAULT_NEWS.subtitle}
          />
          <News 
            targetUrl={DEFAULT_NEWS.targetUrl} 
            imageUrl={DEFAULT_NEWS.imageUrl}
            title={DEFAULT_NEWS.title}
            subtitle={DEFAULT_NEWS.subtitle}
          />
          <News 
            targetUrl={DEFAULT_NEWS.targetUrl} 
            imageUrl={DEFAULT_NEWS.imageUrl}
            title={DEFAULT_NEWS.title}
            subtitle={DEFAULT_NEWS.subtitle}
          />
          <News 
            targetUrl={DEFAULT_NEWS.targetUrl} 
            imageUrl={DEFAULT_NEWS.imageUrl}
            title={DEFAULT_NEWS.title}
            subtitle={DEFAULT_NEWS.subtitle}
          />
          <News 
            targetUrl={DEFAULT_NEWS.targetUrl} 
            imageUrl={DEFAULT_NEWS.imageUrl}
            title={DEFAULT_NEWS.title}
            subtitle={DEFAULT_NEWS.subtitle}
          />
          <News 
            targetUrl={DEFAULT_NEWS.targetUrl} 
            imageUrl={DEFAULT_NEWS.imageUrl}
            title={DEFAULT_NEWS.title}
            subtitle={DEFAULT_NEWS.subtitle}
          />
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
      <div className="w-full flex flex-col items-center bg-purple-700">
        <Link href={"/nes/about"} className="btn btn-ghost text-2xl text-gray-300 hover:bg-purple-700 mt-4 mb-2">
          Contato
        </Link>
        <Link href={"mailto:nes.alagoas@gmail.com"} className="btn-link text-lg text-gray-300 hover:bg-purple-700 mb-4">
          nes.alagoas@gmail.com
        </Link>
      </div>
    </>
  )
}

export default Home
