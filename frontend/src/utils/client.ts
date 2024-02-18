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
export const maskPhone = (phone: string) => {
  const noMask = phone.replace(/\D/g, "")
  const { length } = noMask
  if (length <= 11) {
    return noMask
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, "$1-$2")
  }
  return phone
}

export const maskCEP = (cep: string) => {
  const noMask = cep.replace(/\D/g, "")
  const formattedCEP = noMask.replace(/(\d{5})(\d{3})/, "$1-$2")
  return formattedCEP
}

export const maskCPF = (cpf: string) => {
  const noMask = cpf.replace(/\D/g, "")
  const formattedCPF = noMask.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  return formattedCPF
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
