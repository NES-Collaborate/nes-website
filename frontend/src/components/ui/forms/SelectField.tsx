import React from "react"
import { Tooltip } from "react-daisyui"
import { FiInfo } from "react-icons/fi"

type SelectFieldProps = {
  label: string
  options: { value: string; label: string }[]
  helpText?: string
  errors?: {
    message?: string
  }
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, helpText, errors, ...rest }, ref) => {
    return (
      <div className="form-control w-full max-w-lg">
        <label className="label">
          <span className="label-text flex items-center">
            <span className="mr-1">{label}</span>
            {helpText && (
              <Tooltip message={helpText}>
                <FiInfo />
              </Tooltip>
            )}
          </span>
        </label>
        <select ref={ref} className="select select-bordered w-full max-w-lg" {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label className="label">
          <span className="label-text-alt text-error">{errors?.message}</span>
        </label>
      </div>
    )
  }
)

SelectField.displayName = "SelectField"
