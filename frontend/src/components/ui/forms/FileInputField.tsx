import React, { ChangeEvent } from "react"
import { Tooltip } from "react-daisyui"
import { FiInfo } from "react-icons/fi"

type FileInputFieldProps = {
  label: string
  helpText?: string
  errors?: {
    message?: string
  }
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const FileInputField = React.forwardRef<HTMLInputElement, FileInputFieldProps>(
  ({ label, errors, helpText, onChange, ...rest }, ref) => {
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
        <input
          ref={ref}
          type="file"
          className="file-input file-input-bordered w-full max-w-lg"
          onChange={onChange}
          {...rest}
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors?.message}</span>
        </label>
      </div>
    )
  }
)

FileInputField.displayName = "FileInputField"
