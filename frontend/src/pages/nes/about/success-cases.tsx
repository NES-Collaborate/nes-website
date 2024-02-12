import Loading from "@/components/Loading"
import Logo from "@/components/Logo"
import Brief from "@/components/nes/about/success-cases/Brief"
import SuccessCase from "@/components/nes/about/success-cases/SuccessCase"
import Footer from "@/components/nes/Footer"
import { SuccessCase as SuccessCaseType } from "@/types/constants"
import { axiosApi } from "@/utils/axiosClient"
import { useEffect, useState } from "react"

const Home = () => {
  const [successCases, setSuccessCases] = useState<SuccessCaseType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axiosApi
      .get("/success-case/all")
      .then((res) => {
        setSuccessCases(res.data.successCases || [])
      })
      .catch((err) => {
        console.log(err)
      })
    setIsLoading(false)
  }, [])

  return (
    <div className="min-height flex flex-col">
      <div className="flex-1">
        <div className="mb-4 overflow-hidden">
          <Logo
            type="obmepMedals"
            className="w-full max-h-72 object-cover object-center"
            alt="Banner do NES"
          />
        </div>

        <Brief />

        {isLoading && (
          <div className="flex justify-center items-center h-48">
            <Loading
              text="Carregando Casos de Sucesso..."
              textClassName="ml-3 text-2xl"
            />
          </div>
        )}

        {!isLoading &&
          successCases.map((successCase) => (
            <SuccessCase key={successCase.id} {...successCase} />
          ))}
      </div>

      <Footer />
    </div>
  )
}

export default Home
