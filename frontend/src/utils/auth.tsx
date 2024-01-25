import { SessionContext } from "@/contexts/session"
import { User } from "@/types/user"
import { AxiosError } from "axios"
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next"
import { axiosServer } from "./axiosClient"

/**
 * Sign in the user with username and password and set the session token
 * @param {string} username Username
 * @param {string} password Password
 * @param {SessionContext} session Session context
 * @returns {object} { ok: boolean, error?: string }
 */
export const signIn = async ({
  username,
  password,
  session,
}: {
  username: string
  password: string
  session: SessionContext
}) => {
  if (!username.trim() || !password.trim()) {
    return { ok: false, error: "Preencha todos os campos." }
  }

  // username is a CPF
  if (username.trim().length !== 11) {
    return { ok: false, error: "CPF Inválido." }
  }

  try {
    const res = await axiosServer.post(
      "/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    if (session.setToken) {
      session.setToken(res.data.access_token)
    }

    return { ok: true, ...res.data }
  } catch (error) {
    const e = error as AxiosError
    if (e.response) {
      switch (e.response.status) {
        case 400:
          return { ok: false, error: "CPF ou senha inválido." }
        case 500:
          return {
            ok: false,
            error: "Houve algum erro no servidor. Tente novamente mais tarde.",
          }
        default:
          return {
            ok: false,
            error: "Houve algum erro desconhecido. Tente novamente mais tarde.",
          }
      }
    } else {
      return {
        ok: false,
        error: e.message ?? "Houve algum erro desconhecido. Tente novamente mais tarde.",
      }
    }
  }
}

/**
 * A server-side function to get the logged user
 * @param req Request
 * @returns {SessionContext}
 */
export const getUserSession = async (req: GetServerSidePropsContext["req"]) => {
  const token = req.cookies._token
  if (!token) return null
  try {
    const res = await axiosServer.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data as User
  } catch (err) {
    return null
  }
}

type WithAuthProps = {
  callback?: (
    context: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<any>> | GetServerSidePropsResult<any>
  allowedUsers?: User["type"][]
}

const defaultCallback = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  return { props: {} }
}

/**
 * A decorator to handle authentication
 * @param callback The `getServerSideProps` callback (optional)
 * @param allowedUsers Allowed user types
 * @returns callback(ctx) if logged user else redirect to login
 */
export const withAuth = ({
  callback = defaultCallback,
  allowedUsers = ["admin", "student", "other"],
}: WithAuthProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const user = await getUserSession(ctx.req)

    const isAllowed = user && allowedUsers.includes(user.type as User["type"])
    if (!isAllowed) {
      return {
        redirect: {
          destination: "/nes",
          permanent: false,
        },
      }
    }

    return callback(ctx)
  }
}

// TODO: Add "alowed_user_types" param.
/**
 * A decorator to handle authentication for API's
 * @param callback The `NextApiHandler` callback
 * @returns callback(req, res) if logged user else 401
 */
export const apiWithAuth =
  (callback: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const user = getUserSession(req)

    if (!user) {
      res.status(401).json({ error: "Unauthorized" })
      return
    }

    return callback(req, res)
  }
