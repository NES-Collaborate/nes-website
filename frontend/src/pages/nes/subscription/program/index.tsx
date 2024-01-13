import ButtonNES from "@/components/ButtonNES"
import Logo from "@/components/Logo"
import Footer from "@/components/nes/Footer"
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
        <div className="mb-4 overflow-hidden">
          <Logo
            type="banner"
            className="w-full max-h-72 object-cover object-center"
            alt="Banner do NES"
          />
        </div>

        <div className="w-full flex flex-col items-center">
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
