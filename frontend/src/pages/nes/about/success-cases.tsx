import Loading from "@/components/Loading"
import Logo from "@/components/Logo"
import Brief from "@/components/nes/about/success-cases/Brief"
import SuccessCase from "@/components/nes/about/success-cases/SuccessCase"
import Footer from "@/components/nes/Footer"
import { useSuccessCases } from "@/hooks/admin/lp"
const Home = () => {
  const { data: successCases = [], isLoading } = useSuccessCases()

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

        <div className="flex flex-col items-center">
          {!isLoading &&
            successCases.map((successCase) => (
              <SuccessCase key={successCase.id} {...successCase} />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
