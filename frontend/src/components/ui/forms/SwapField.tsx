import { Tooltip } from "react-daisyui"
import { FiInfo } from "react-icons/fi"

type SwapFieldProps = {
  label: string
  helpText?: string
  errors?: {
    message?: string
  }
  swapOn: React.ReactNode
  swapOff: React.ReactNode
  onCheck?: (checked: boolean) => void
}

export const SwapField = ({
  label,
  helpText,
  errors,
  swapOn,
  swapOff,
  onCheck,
}: SwapFieldProps) => {
  const handleCheck = (checked: boolean) => {
    onCheck && onCheck(checked)
  }

  return (
    <div className="form-control w-full max-w-lg">
      <label className="label">
        <span className="label-text items-center">
          <span className="mr-1">{label}</span>
          {helpText && (
            <Tooltip message={helpText}>
              <FiInfo />
            </Tooltip>
          )}
        </span>
      </label>

      <label className="swap input input-bordered !outline-none">
        <input type="checkbox" onChange={(e) => handleCheck(e.target.checked)} />
        <div className="swap-on">{swapOn}</div>
        <div className="swap-off">{swapOff}</div>
      </label>

      <label className="label">
        <span className="label-text-alt text-error">{errors?.message}</span>
      </label>
    </div>
  )
}
