import { AxiosError } from "axios"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { axiosSesh } from "./axiosClient"

export const GetSession = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    const tokenDeclaration = document.cookie
      .split("; ")
      .find((c) => c.startsWith("_token="))

    if (tokenDeclaration) {
      const token = tokenDeclaration.split("=")[1]

      axiosSesh
        .get("/api/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setSession(res.data)
        })
        .catch(() => {
          setSession(null)
        })
    }
  }, [])

  return session
}

export const withAuth = async (Component: any) => {
  const useWrapper = (props: any) => {
    const session = GetSession()
    useEffect(() => {
      if (!session) {
        redirect("/login")
      }
    }, [session])

    if (!session) {
      return null
    }

    return <Component {...props} />
  }

  return useWrapper
}

export const signIn = async ({
  username,
  password,
  csrfToken,
}: {
  username: string
  password: string
  csrfToken: string
}) => {
  if (!username.trim() || !password.trim()) {
    return { ok: false, error: "Preencha todos os campos." }
  }

  // Is expected that the backend will set the cookie (_token)
  try {
    const res = await axiosSesh.post(
      "/login",
      { username, password, csrfToken },
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
    return res.data
  } catch (error) {
    const e = error as AxiosError
    return { ok: false, error: e.message }
  }
}

export const getCsrfToken = async () => {
  try {
    return (await axiosSesh.get("/csrfToken")).data
  } catch (e) {
    console.error(e)
  }
  return "csrfToken" // TODO: remove this and put a proper error
}
