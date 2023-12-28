import { useSession } from "@/contexts/session"
import { getCsrfToken, signIn } from "@/utils/auth"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiFillWarning } from "react-icons/ai"
import { IoIosLogIn } from "react-icons/io"

type Props = {
  csrfToken: string
}

const Login = ({ csrfToken }: Props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.user) {
      setErrors([`Você já está logado como ${session.user.username}.`])
      setInterval(() => {
        setErrors([])
        router.push("/")
      }, 3000)
    }
  }, [session, router])

  const handleSubmit = async () => {
    setIsLoggingIn(true)
    const result = await signIn({
      username,
      password,
      csrfToken,
    })

    if (!result?.ok) {
      setIsLoggingIn(false)
      setErrors([...errors, result?.error ?? "Falha na autenticação."])
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
            placeholder="Seu usuário"
            className={clsx(
              "input input-accent w-full",
              isLoggingIn && "cursor-not-allowed"
            )}
            onChange={(e) => setUsername(e.target.value)}
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
            type="text"
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

        <button
          className={clsx(
            "btn btn-outline btn-primary",
            isLoggingIn && "cursor-not-allowed"
          )}
          onClick={handleSubmit}
          disabled={isLoggingIn}
        >
          <IoIosLogIn />
          Entrar
        </button>
      </div>
    </div>
  )
}

export default Login

export const getServerSideProps = async () => {
  const csrfToken = await getCsrfToken()

  return {
    props: {
      csrfToken,
    },
  }
}
