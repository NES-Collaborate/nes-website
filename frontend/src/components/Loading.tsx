import { cn } from "@/utils/client"
import { Loading as LoadingDaisyui } from "react-daisyui"

type Props = {
  text?: string
  textClassName?: string
  center?: boolean
}

const Loading = ({ text, center, textClassName }: Props) => {
  return (
    <div className={cn("flex gap-3", center && "justify-center items-center")}>
      <LoadingDaisyui /> {text && <span className={textClassName}>{text}</span>}
    </div>
  )
}

export default Loading
