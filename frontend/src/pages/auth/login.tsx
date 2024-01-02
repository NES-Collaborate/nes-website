import { Loading } from "@/components/Loading"
import { Button } from "@/components/Button"
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
    <div className="h-screen flex justify-center items-center">
      <div className="shadow-xl flex flex-col justify-between gap-5 p-5 rounded-md md:w-1/5">
        <h1 className="text-3xl text-center">Login</h1>
        {errors.length > 0 && (
          <div className="flex flex-col gap-2 p-2">
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

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Usuário</span>
          </div>
          <input
            type="text"
            placeholder="Seu CPF"
            className={clsx(
              "input input-accent w-full",
              isLoggingIn && "cursor-not-allowed"
            )}
            onChange={(e) => setUsername(e.target.value.replace(/\D/g, ""))}
            onClick={() => setErrors([])}
            value={username}
            disabled={isLoggingIn}
          />
        </label>

        <label className="form-control w-full">
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
            value={password}
            disabled={isLoggingIn}
          />
        </label>

        <Button
          type="action"
          style="outline"
          className=""
          onClick={handleSubmit}
          disabled={isLoggingIn}
        >
          {isLoggingIn && <Loading text="Carregando..." textClassName="text-white" />}
          {!isLoggingIn && (
            <>
              <IoIosLogIn />
              Entrar
            </>
          )}
        </Button>
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
