import { InputField } from "@/components/ui/forms/InputField"
import { maskCEP } from "@/utils/client"

type Props = {
  register: any
  errors: any
}

export const AddressForm = ({ register, errors }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <InputField
        label="CEP"
        mask={maskCEP}
        {...register("address.cep")}
        errors={errors.address?.cep}
      />

      <InputField
        label="Rua"
        {...register("address.street")}
        errors={errors.address?.street}
      />

      <InputField
        label="Bairro"
        {...register("address.neighborhood")}
        errors={errors.address?.neighborhood}
      />

      <InputField
        label="Cidade"
        {...register("address.city")}
        errors={errors.address?.city}
      />

      <InputField
        label="Estado"
        {...register("address.state")}
        errors={errors.address?.state}
      />

      <InputField
        label="Número"
        {...register("address.number")}
        errors={errors.address?.number}
        mask={(mask) => mask.replace(/[^0-9]/g, "")}
      />

      <InputField
        label="Complemento"
        {...register("address.complement")}
        errors={errors.address?.complement}
      />
    </div>
  )
}
