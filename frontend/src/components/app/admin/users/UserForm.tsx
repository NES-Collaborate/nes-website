import { FileInputField } from "@/components/ui/forms/FileInputField"
import { InputField } from "@/components/ui/forms/InputField"
import { SelectField } from "@/components/ui/forms/SelectField"
import { useSession } from "@/contexts/session"
import { SERIES, USER_TYPES, USER_TYPES_MASK } from "@/data/constants"
import { useUserMutations } from "@/hooks/admin/users"
import { useClassrooms } from "@/hooks/teacher/classrooms"
import {
  EmailFormData,
  PhoneNumberFormData,
  UserFormData,
  userSchema,
} from "@/schemas/user"
import { Serie } from "@/types/constants"
import { maskCPF, maskDate, maskMoney, maskPhone, uploadAttach } from "@/utils/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaTimes } from "react-icons/fa"
import { AddressForm } from "./AddressForm"
import { UserModalProps } from "./UserModal"

const UserForm = ({ user, action, setModalState }: Omit<UserModalProps, "isOpen">) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    values: {
      id: user?.id || 0,
      name: user?.name || "",
      cpf: maskCPF(user?.cpf || ""),
      birthdate: user?.birthdate || "",
      address: {
        city: user?.address?.city || "",
        neighborhood: user?.address?.neighborhood || "",
        number: user?.address?.number,
        state: user?.address?.state || "",
        street: user?.address?.street || "",
        cep: user?.address?.cep || "",
      },
      responsible_name: user?.responsible_name || "",
      responsible_phone: maskPhone(user?.responsible_phone || ""),
      serie: user?.serie as Serie,
      scholarship: user?.scholarship || 0,
      type: user?.type || "other",
      classroom: {
        id: user?.classroom?.id || 0,
      },
      emails: [],
      phones: [],
      password: "",
      photo: null,
    },
  })

  const userType = watch("type")

  const { data: classrooms } = useClassrooms()

  const [emails, setEmails] = useState<EmailFormData[]>([])
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumberFormData[]>([])

  const { createMutation, editMutation } = useUserMutations()
  const { token } = useSession()

  useEffect(() => {
    setEmails(user?.emails || [])
    setPhoneNumbers(
      (user?.phones || []).map((phone) => ({
        value: maskPhone(phone.value),
        isEmergency: phone.isEmergency || false,
      })) || []
    )
  }, [user])

  const submitForm: SubmitHandler<UserFormData> = async (data) => {
    var formData = {
      ...data,
      emails,
      phones: phoneNumbers,
    }

    const result = await userSchema.safeParseAsync({
      ...formData,
      photo: { length: 1, item: (_: number) => data.photo },
    })

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        setError(issue.path[0] as any, {
          type: "manual",
          message: issue.message,
        })
      })
      return
    }

    if (action === "create" && !data.photo)
      return setError("photo", { message: "Imagem é obrigatória!" })

    var attach = null
    if (data.photo) {
      attach = await uploadAttach(data.photo, token)
      if (typeof attach === "string") return setError("photo", { message: attach })
    }

    switch (action) {
      case "create":
        await createMutation.mutateAsync({ ...formData, photo: attach })
        break
      case "edit":
        await editMutation.mutateAsync({ ...formData, photo: attach })
        break
    }

    setModalState((prevState) => ({ ...prevState, isOpen: false }))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="grid grid-cols-3 gap-3 w-full">
      <InputField label="Nome" {...register("name")} errors={errors.name} />

      <InputField label="CPF" mask={maskCPF} {...register("cpf")} errors={errors.cpf} />

      <InputField
        label="Data de Nascimento"
        mask={maskDate}
        {...register("birthdate")}
        errors={errors.birthdate}
      />

      <SelectField
        label="Tipo de Usuário"
        options={USER_TYPES.map((type) => ({
          value: type,
          label: USER_TYPES_MASK[type],
        }))}
        {...register("type")}
        errors={errors.type}
      />

      <div>
        <InputField
          label="Emails"
          helpText="Digite e pressione Enter para adicionar"
          {...register("emails")}
          errors={errors.emails}
          onEnter={(input) => {
            setEmails([...emails, { value: input.value }])
            input.value = ""
          }}
        />
        <ol>
          {emails.map(({ value }, index) => (
            <li key={index} className="text-sm ml-3 flex gap-1 items-center">
              <button
                className="btn btn-error btn-xs"
                onClick={() => setEmails(emails.filter((_, i) => i !== index))}
              >
                <FaTimes />
              </button>
              <span>{value}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <InputField
          label="Telefones"
          helpText="Digite e pressione Enter para adicionar"
          {...register("phones")}
          errors={errors.phones}
          mask={maskPhone}
          onEnter={(input) => {
            setPhoneNumbers([...phoneNumbers, { value: input.value, isEmergency: false }])
            input.value = ""
          }}
        />
        <ol>
          {phoneNumbers.map(({ value }, index) => (
            <li key={index} className="text-sm ml-3 flex gap-1 items-center">
              <button
                className="btn btn-error btn-xs"
                onClick={() =>
                  setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index))
                }
              >
                <FaTimes />
              </button>
              <span>{value}</span>
            </li>
          ))}
        </ol>
      </div>

      <InputField
        label="Senha"
        type="password"
        {...register("password")}
        errors={errors.password}
      />

      <FileInputField
        label="Foto de Perfil"
        {...register("photo")}
        errors={errors.photo}
      />

      {userType === "student" && (
        <>
          <InputField
            helpText="Bolsa do aluno em R$"
            label="Bolsa"
            mask={maskMoney}
            {...register("scholarship")}
            errors={errors.scholarship}
          />

          <InputField
            label="Nome do Responsável"
            {...register("responsible_name")}
            errors={errors.responsible_name}
          />

          <InputField
            label="Telefone do Responsável"
            mask={maskPhone}
            {...register("responsible_phone")}
            errors={errors.responsible_phone}
          />

          <SelectField
            label="Série"
            helpText="Série escolar"
            options={SERIES.map((serie) => ({
              value: serie,
              label: serie,
            }))}
            {...register("serie")}
            errors={errors.serie}
          />

          <SelectField
            label="Turma"
            options={(classrooms || []).map(({ id, name }) => ({
              value: id.toString(),
              label: name,
            }))}
            {...register("classroom")}
            errors={errors.serie}
          />
        </>
      )}

      <div className="collapse bg-base-200 col-span-full">
        <input type="checkbox" className="peer" defaultChecked />
        <div className="collapse-title text-center">Endereço</div>
        <div className="collapse-content">
          <AddressForm register={register} errors={errors} />
        </div>
      </div>

      <button type="submit" className="btn btn-primary col-span-full">
        {action === "create" ? "Criar Usuário" : "Editar Usuário"}
      </button>
    </form>
  )
}

export default UserForm
