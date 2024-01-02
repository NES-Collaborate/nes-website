import clsx from "clsx"
import { Loading as LoadingDaisyui } from "react-daisyui"

type Props = {
  text?: string
  textClassName?: string
  center?: boolean
}

export const Loading = ({ text, center, textClassName }: Props) => {
  return (
    <div className={clsx("flex gap-3", center && "justify-center items-center")}>
      <LoadingDaisyui /> {text && <span className={textClassName}>{text}</span>}
    </div>
  )
}
