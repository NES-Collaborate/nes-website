import ButtonNES from "@/components/ButtonNES"
import Logo from "@/components/layout/default/Logo"
import Footer from "@/components/nes/Footer"
import Table from "@/components/nes/subscription/Table"
import { SELECTIONS_EXAMPLES, Selection } from "@/data/constants"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Home = () => {
  const router = useRouter()
  const { selectionYear } = router.query
  const [selection, setSelection] = useState<Selection>()

  useEffect(() => {
    const selected = SELECTIONS_EXAMPLES.find(
      (selection) => selection.year === selectionYear
    )

    if (selected) {
      setSelection(selected)
    } else {
      setSelection(SELECTIONS_EXAMPLES[0])
    }
  }, [selectionYear])

  return (
    <div className="min-height flex flex-col">
      <div className="flex-1">
        <div className="flex flex-wrap w-full justify-evenly mb-4 mt-10">
          <ButtonNES
            type="navigation"
            style="fill"
            className="btn-lg w-2/5 my-4 !pl-4"
            href="#subscription"
          >
            Inscrições
          </ButtonNES>
          <ButtonNES
            type="navigation"
            style="fill"
            className="btn-lg w-2/5 my-4 !pl-4"
            href="#schedule"
          >
            Cronograma
          </ButtonNES>
          <ButtonNES
            type="navigation"
            style="fill"
            className="btn-lg w-2/5 my-4 !pl-4"
            href="#results"
          >
            Resultados
          </ButtonNES>
          <ButtonNES
            type="navigation"
            style="fill"
            className="btn-lg w-2/5 my-4 !pl-4"
            href="#program"
          >
            Ementa
          </ButtonNES>
        </div>

        {/* Inscrições */}
        <div className="mb-4 overflow-hidden flex justify-center mt-10" id="subscription">
          <Logo
            type="bannerInscricoes"
            className="w-11/12 max-h-72 object-cover object-center"
            alt="Banner do NES"
          />
        </div>

        <div className="w-full flex flex-col items-center">
          <h1 className="text-primary text-3xl stroke-1 mb-4 text-center">
            Faça a sua inscrição no Processo Seletivo {selection?.year}!
          </h1>
        </div>

        <div className="flex flex-wrap mt-2 justify-center">
          <iframe
            width="100%"
            height="100%"
            src={selection?.iframeSrc}
            title={selection?.year}
            className="min-h-96 sm:max-w-2xl mb-4"
            allowFullScreen
          ></iframe>
        </div>

        {/* Cronograma */}
        <div
          className="mb-4 overflow-hidden flex flex-col items-center mt-10"
          id="schedule"
        >
          <Logo
            type="calendarBanner"
            className="w-11/12 max-h-72 object-cover object-center"
            alt="Banner do NES"
          />

          <div className="w-full flex flex-col items-center my-4">
            <h1 className="text-primary text-3xl stroke-1 mb-4">Cronograma</h1>
          </div>

          {SELECTIONS_EXAMPLES.map((selection) => {
            if (selection.year === selectionYear) {
              return (
                <ul className="list-disc list-inside w-5/6" key={selection.year}>
                  {selection.schedule.map((event, i) => (
                    <li key={i} className="mb-1">
                      <span className="text-primary">{event.date}</span> -{" "}
                      {event.description}
                    </li>
                  ))}
                </ul>
              )
            }
          })}
        </div>

        {/* Resultados */}
        <div className="mb-4 overflow-hidden flex justify-center mt-10" id="results">
          <Logo
            type="bannerResultados"
            className="w-11/12 max-h-72 object-cover object-center"
            alt="Banner do NES"
          />
        </div>

        <Table />

        {/* Ementa */}
        <div className="w-full flex flex-col items-center mt-10" id="program">
          <h1 className="text-primary text-3xl stroke-1 mb-4 text-center">
            Ementa {selection?.year}!
          </h1>
        </div>

        <div className="flex flex-wrap mt-2 justify-center">
          <iframe
            width="100%"
            height="100%"
            src={selection?.program}
            title={selection?.year}
            className="min-h-96 sm:max-w-2xl mb-4"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
