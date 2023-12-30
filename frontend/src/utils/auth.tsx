import { AxiosError } from "axios"
import {
  GetServerSidePropsContext,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next"
import { useEffect, useState } from "react"
import { axiosSesh } from "./axiosClient"

export const getMe = async (token: string) => {
  return (
    await axiosSesh.get("/api/me", {
      headers: {
        Authorization: token,
      },
    })
  ).data
}

export const GetSession = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    const tokenDeclaration = document.cookie
      .split("; ")
      .find((c) => c.startsWith("_token="))

    if (tokenDeclaration) {
      const token = tokenDeclaration.split("=")[1]

      getMe(token).then((user) => setSession(user))
    }
  }, [])

  return session
}

export const signIn = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  if (!username.trim() || !password.trim()) {
    return { ok: false, error: "Preencha todos os campos." }
  }

  // Is expected that the backend will set the cookie (_token)
  try {
    const res = await axiosSesh.post(
      "/api/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    return res.data
  } catch (error) {
    const e = error as AxiosError
    // TODO: Add better error handling (for example, by status code 422)
    return { ok: false, error: e.message }
  }
}

export const getSession = async (req: GetServerSidePropsContext["req"]) => {
  const token = req.cookies._token

  if (!token) {
    return { user: null }
  }

  return { user: await getMe(token) }
}

export async function withAuth<P>(
  handler: (context: GetServerSidePropsContext) => Promise<{ props: P }>
) {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context.req)

    if (!session.user) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      }
    }

    return await handler(context)
  }
}

export const simpleWithAuth = async () => {
  return await withAuth(async () => ({
    props: {},
  }))
}

export const apiWithAuth =
  (callback: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession(req)

    if (!session.user) {
      res.status(401).json({ error: "Unauthorized" })
      return
    }

    return callback(req, res)
  }
