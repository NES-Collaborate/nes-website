import clsx from "clsx"
import { useEffect } from "react"
import { Toast as ToastDUI, ToastProps } from "react-daisyui"

interface Props extends ToastProps {
  message: string
  setMessage: (message: string) => void
  alert?: "info" | "success" | "warning" | "error"
}

/**
 * Toast with alert message
 * @param message The message of the toast
 * @param setMessage The function to set the message
 * @param alert The type of the alert
 */
const Toast = ({ message, setMessage, alert, ...props }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("")
    }, 2500)

    return () => clearTimeout(timer)
  }, [message, setMessage])

  return (
    <ToastDUI
      {...props}
      className={clsx(
        "transition-opacity",
        props.vertical === "top" && "mt-28",
        message && "opacity-100",
        !message && "opacity-0 pointer-events-none"
      )}
    >
      <div className={`alert alert-${alert || "info"}`}>
        <span>{message}</span>
      </div>
    </ToastDUI>
  )
}

export default Toast
