import Logo from "@/components/Logo"
import Footer from "@/components/nes/Footer"
import { SELECTIONS_EXAMPLES } from "@/data/constants"
import { useRouter } from "next/router"

const Home = () => {
  const router = useRouter()
  const { selectionYear } = router.query

  return (
    <div className="min-height flex flex-col">
      <div className="flex-1">
        <div className="mb-4 overflow-hidden flex flex-col items-center">
          <Logo
            type="calendarBanner"
            className="w-full max-h-72 object-cover object-center"
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
      </div>

      <Footer />
    </div>
  )
}

export default Home
