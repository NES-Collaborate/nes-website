import { cn } from "@/utils/client"
import React from "react"
import { Tooltip } from "react-daisyui"
import { FiInfo } from "react-icons/fi"

type InputFieldProps = {
  label: string
  mask?: (value: string) => string
  helpText?: string
  boxClassName?: string
  errors?: {
    message?: string
  }
  onEnter?: (input: HTMLInputElement) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      errors,
      mask = (value) => value,
      helpText,
      onEnter,
      className,
      boxClassName,
      ...rest
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        if (onEnter) onEnter(e.currentTarget)
      }
    }

    return (
      <div className={cn("form-control w-full max-w-lg", boxClassName)}>
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
        <input
          ref={ref}
          className={cn("input input-bordered w-full max-w-lg", className)}
          {...rest}
          onChange={(e) => (e.target.value = mask(e.target.value))}
          onKeyDown={handleKeyDown}
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors?.message}</span>
        </label>
      </div>
    )
  }
)

InputField.displayName = "InputField"
