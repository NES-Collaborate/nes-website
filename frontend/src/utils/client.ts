import { Attach } from "@/types/entities"
import { User } from "@/types/user"
import { axiosServer } from "./axiosClient"

/**
 * Get user photo url to display
 * @param user The user instance
 * @returns string
 */
export const getUserPhotoUrl = (user: User) => {
  return getAttachmentUrl(user?.photo || ({} as Attach))
}

/**
 * Get attachment url
 * @param attach An attachment
 * @returns string
 */
export const getAttachmentUrl = (attach: Attach) => {
  if (!attach?.location) return "/img/default-user.png"
  if (attach.type === "Link") return attach.location
  return `/api/server/attachments/${attach?.id}`
}

/**
 * Upload a file to backend and register it as an attachment
 * @param attach A file to upload
 * @param token The logged user session
 * @returns Attach if success or error message
 */
export const uploadAttach = async (attach: any, token: string) => {
  const form = new FormData()
  form.append("data", attach)
  try {
    const res = await axiosServer.post("/upload", form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    return res.data as Attach
  } catch {
    return "Erro ao registrar anexo. Tente novamente mais tarde."
  }
}

// https://github.com/juliossena/vendas-online-web/blob/afd0b010310202cc84c27b73dc6faedf2d5abaa7/src/shared/functions/phone.ts
export const maskPhone = (input: string) => {
  const noMask = input.replace(/\D/g, "")
  const { length } = noMask
  let formattedPhone = ""

  if (length <= 2) {
    formattedPhone = noMask
  } else if (length <= 7) {
    formattedPhone = noMask.replace(/(\d{2})(\d)/, "($1) $2")
  } else {
    formattedPhone = noMask.replace(/(\d{2})(\d{1,4})(\d{1,4})/, "($1) $2-$3")
  }

  return formattedPhone.slice(0, 15)
}

export const maskCEP = (cep: string) => {
  const noMask = cep.replace(/\D/g, "")
  const formattedCEP = noMask.replace(/(\d{5})(\d{3})/, "$1-$2")
  return formattedCEP.slice(0, 9)
}

export const maskCPF = (input: string) => {
  const noMask = input.replace(/\D/g, "")
  const { length } = noMask
  let formattedCPF = ""

  if (length <= 3) {
    formattedCPF = noMask
  } else if (length <= 6) {
    formattedCPF = noMask.replace(/(\d{3})(\d)/, "$1.$2")
  } else if (length <= 9) {
    formattedCPF = noMask.replace(/(\d{3})(\d{3})(\d)/, "$1.$2.$3")
  } else {
    formattedCPF = noMask.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  return formattedCPF.slice(0, 14)
}

export const maskDate = (input: string) => {
  const noMask = input.replace(/\D/g, "")
  let formattedDate = ""

  if (noMask.length <= 2) {
    formattedDate = noMask
  } else if (noMask.length <= 4) {
    formattedDate = noMask.replace(/(\d{2})(\d{2})/, "$1/$2")
  } else {
    formattedDate = noMask.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3")
  }

  return formattedDate.slice(0, 10)
}

export const maskMoney = (money: string) => {
  const cleanedMoney = money.replace(/\D/g, "")

  if (cleanedMoney === "") {
    return ""
  }

  const integerPart = cleanedMoney.slice(0, -2)
  const decimalPart = cleanedMoney.slice(-2)

  // Insert dot every three digits from the end of integer part
  const formattedInteger = integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")

  const formattedMoney = formattedInteger + "," + decimalPart

  return formattedMoney
}

export const toReal = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export const toLocalDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
