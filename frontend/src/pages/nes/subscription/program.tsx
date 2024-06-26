import Logo from "@/components/layout/default/Logo"
import Footer from "@/components/nes/Footer"
import Table from "@/components/nes/subscription/Table"
import { SELECTIONS_EXAMPLES, Selection } from "@/data/constants"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiOutlineForm } from "react-icons/ai"
import { FaBookOpen, FaTableList } from "react-icons/fa6"
import { GrFormSchedule } from "react-icons/gr"
import { RxHamburgerMenu } from "react-icons/rx"

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
        {/* Botões de navegação */}
        <div className="dropdown dropdown-hover dropdown-top dropdown-end fixed bottom-4 right-4">
          <div tabIndex={0} role="button" className="btn border-primary">
            <RxHamburgerMenu className="text-primary size-6" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link type="navigation" href="#subscription">
                <AiOutlineForm className="size-4" />
                Inscrições
              </Link>
            </li>
            <li>
              <Link type="navigation" href="#schedule">
                <GrFormSchedule className="size-4" />
                Cronograma
              </Link>
            </li>
            <li>
              <Link type="navigation" href="#results">
                <FaTableList className="size-4" />
                Resultados
              </Link>
            </li>
            <li>
              <Link type="navigation" href="#program">
                <FaBookOpen className="size-4" />
                Ementa
              </Link>
            </li>
          </ul>
        </div>

        {/* Inscrições */}
        <a
          href={selection?.subscriptionUrl}
          target="_blank"
          className="w-full flex flex-col items-center"
        >
          <div className="mb-4 overflow-hidden flex justify-center" id="subscription">
            <Logo
              type="bannerInscricoes"
              className="w-11/12 max-h-72 object-cover object-center"
              alt="Banner do NES"
            />
          </div>
          <h1 className="w-11/12 text-primary text-3xl mb-4 text-center underline hover:text-secondary">
            Clique aqui para se inscrever no Processo Seletivo {selection?.year}!
          </h1>
        </a>

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
        <a
          href={selection?.programUrl}
          target="_blank"
          className="w-full flex flex-col items-center mt-10"
          id="program"
        >
          <h1 className="text-primary text-3xl stroke-1 mb-4 text-center">
            Ementa {selection?.year}!
          </h1>

          <h1 className="w-11/12 text-primary text-3xl mb-4 text-center underline hover:text-secondary">
            Clique aqui para ver a ementa do NES!
          </h1>
        </a>
      </div>

      <Footer />
    </div>
  )
}

export default Home
