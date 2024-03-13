import Loading from "@/components/Loading"
import Toast from "@/components/Toast"
import { InputField } from "@/components/ui/forms/InputField"
import { useSession } from "@/contexts/session"
import { User } from "@/types/user"
import { getUserSession, signIn } from "@/utils/auth"
import { maskCPF } from "@/utils/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { IoIosLogIn } from "react-icons/io"
import { z } from "zod"

type Props = {
  userSession: User
}

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "CPF deve ser preenchido")
    .transform((cpf) => cpf.replace(/[^0-9]/g, "")),
  password: z.string().min(1, "Senha deve ser preenchida"),
})

type FormData = z.infer<typeof loginSchema>

/**
 * Login component for user authentication.
 *
 * @param {Props} userSession - the user session information
 * @return {JSX.Element} the login component
 */
const Login = ({ userSession }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })
  const [toast, setToast] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (userSession) {
      setIsLoggingIn(true)
      setToast(`Você já está logado como ${userSession.name}.`)
      setTimeout(() => router.push("/app"), 2000)
    }
  }, [router, userSession])

  const submit: SubmitHandler<FormData> = async (data) => {
    console.log(data)
    setIsLoggingIn(true)
    const result = await signIn({
      username: data.username,
      password: data.password,
      session,
    })

    if (result.ok) {
      router.push("/app")
    } else {
      setIsLoggingIn(false)
      setToast(result.error ?? "Falha na autenticação.")
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg md:p-8 lg:max-w-xl bg-base-300">
        <h1 className="text-3xl text-center font-semibold">Login</h1>
        <InputField
          label="Usuário"
          helpText="Seu CPF"
          mask={maskCPF}
          {...register("username")}
          errors={errors.username}
          disabled={isLoggingIn}
        />

        <InputField
          label="Senha"
          {...register("password")}
          type="password"
          errors={errors.password}
          disabled={isLoggingIn}
        />

        <button
          className="btn btn-primary w-full mt-6"
          onClick={handleSubmit(submit)}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <Loading center />
          ) : (
            <div className="flex items-center gap-2">
              <IoIosLogIn className="text-xl" /> Entrar
            </div>
          )}
        </button>
      </div>

      <Toast
        message={toast}
        setMessage={setToast}
        alert="warning"
        horizontal="end"
        vertical="top"
      />
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
