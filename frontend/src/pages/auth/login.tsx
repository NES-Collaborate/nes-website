import ButtonNES from "@/components/ButtonNES"
import Loading from "@/components/Loading"
import { useSession } from "@/contexts/session"
import { User } from "@/types/user"
import { getUserSession, signIn } from "@/utils/auth"
import clsx from "clsx"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiFillWarning } from "react-icons/ai"
import { IoIosLogIn } from "react-icons/io"

type Props = {
  userSession: User
}

/**
 * Login component for user authentication.
 *
 * @param {Props} userSession - the user session information
 * @return {JSX.Element} the login component
 */
const Login = ({ userSession }: Props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (userSession) {
      setIsLoggingIn(true)
      setErrors([`Você já está logado como ${userSession.name}.`])
      setTimeout(() => router.push("/app"), 3000)
    }
  }, [router, userSession])

  const handleSubmit = async () => {
    setIsLoggingIn(true)
    const result = await signIn({
      username,
      password,
      session,
    })

    if (result.ok) {
      router.push("/app")
    } else {
      setIsLoggingIn(false)
      setErrors([...errors, result.error ?? "Falha na autenticação."])
    }
    setIsLoggingIn(false)
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 rounded-md shadow-lg md:p-8 lg:max-w-xl">
        <h1 className="text-3xl text-center font-semibold">Login</h1>
        {errors.length > 0 && (
          <div className="mt-6 space-y-2">
            {errors.map((error, i) => (
              <div
                key={i}
                role="alert"
                className="alert alert-error shadow-lg rounded-md flex items-center p-2 text-sm text-white bg-red-500"
              >
                <AiFillWarning className="text-lg mr-2" />
                {error}
              </div>
            ))}
          </div>
        )}

        <label className="form-control w-full mt-6">
          <div className="label">
            <span className="label-text">Usuário</span>
          </div>
          <input
            type="text"
            placeholder="Seu CPF"
            className={clsx(
              "input input-accent w-full px-4 mt-1",
              isLoggingIn && "cursor-not-allowed"
            )}
            onChange={(e) => setUsername(e.target.value.replace(/\D/g, ""))}
            onClick={() => setErrors([])}
            value={username}
            disabled={isLoggingIn}
          />
        </label>

        <label className="form-control w-full mt-4">
          <div className="label">
            <span className="label-text">Senha</span>
          </div>
          <input
            type="password"
            placeholder="Sua senha"
            className={clsx(
              "input input-accent w-full",
              isLoggingIn && "cursor-not-allowed"
            )}
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => setErrors([])}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            value={password}
            disabled={isLoggingIn}
          />
        </label>

        <ButtonNES
          type="action"
          style="outline"
          onClick={handleSubmit}
          disabled={isLoggingIn}
          className="mt-6 w-full py-3"
        >
          {isLoggingIn && <Loading text="Carregando..." textClassName="text-white" />}
          {!isLoggingIn && (
            <>
              <IoIosLogIn />
              Entrar
            </>
          )}
        </ButtonNES>
      </div>
    </div>
  )
}

export default Login

export const getServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  const userSession = await getUserSession(req)
  return {
    props: { userSession },
  }
}
