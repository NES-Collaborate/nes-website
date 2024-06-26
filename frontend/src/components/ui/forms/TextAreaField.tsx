import { cn } from "@/utils/client"
import React from "react"
import { Tooltip } from "react-daisyui"
import { FiInfo } from "react-icons/fi"

type TextAreaFieldProps = {
  label: string
  helpText?: string
  className?: string
  boxClassName?: string
  errors?: {
    message?: string
  }
}

export const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, errors, helpText, className, ...rest }, ref) => {
    return (
      <div className={cn("form-control w-full max-w-lg", className)}>
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
        <textarea
          ref={ref}
          className={cn("textarea textarea-bordered w-full max-w-lg", className)}
          {...rest}
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors?.message}</span>
        </label>
      </div>
    )
  }
)

TextAreaField.displayName = "TextAreaField"
