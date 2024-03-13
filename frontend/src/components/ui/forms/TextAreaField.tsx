import React from "react"
import { Tooltip } from "react-daisyui"
import { FiInfo } from "react-icons/fi"

type TextAreaFieldProps = {
  label: string
  helpText?: string
  errors?: {
    message?: string
  }
}

export const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, errors, helpText, ...rest }, ref) => {
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
        <textarea
          ref={ref}
          className="textarea textarea-bordered w-full max-w-lg"
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
