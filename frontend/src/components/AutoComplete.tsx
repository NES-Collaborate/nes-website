import { ExpenseCategory } from "@/types/finance"
import clsx from "clsx"
import React, { useState } from "react"
import { Input, Tooltip } from "react-daisyui"
import { IoIosInformationCircle } from "react-icons/io"

type Props = {
  inputRef: any
  label: string
  message: string
  options: ExpenseCategory[]
}

const AutoComplete = ({ inputRef, label, message, options }: Props) => {
  const [inputValue, setInputValue] = useState("")
  const [filteredOptions, setFilteredOptions] = useState<ExpenseCategory[]>(options)
  const [inputFocused, setInputFocused] = useState(false)
  const [blurTimeout, setBlurTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    const filtered = options.filter((option: ExpenseCategory) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredOptions(filtered)
  }

  const handleOptionClick = (option: ExpenseCategory) => {
    setInputValue(option.name)
    setFilteredOptions([])
  }

  const handleBlur = () => {
    const timeoutId = setTimeout(() => {
      setInputFocused(false)
    }, 500)

    setBlurTimeout(timeoutId)
  }

  const handleFocus = () => {
    if (blurTimeout !== null) {
      clearTimeout(blurTimeout)
      setBlurTimeout(null)
    }
    setInputFocused(true)
  }

  return (
    <div className="form-control w-full max-w-xs">
      <label>
        <div className="label">
          <span className={clsx("label-text", message && "flex items-center")}>
            <p className="mr-1">{label}</p>
            {message && (
              <Tooltip message={message}>
                <IoIosInformationCircle size={17} />
              </Tooltip>
            )}
          </span>
        </div>
      </label>
      <Input
        ref={inputRef}
        size="md"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        color="primary"
      />
      {inputFocused && (
        <ul className="menu bg-base-200 rounded-box">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="hover:bg-base-100"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AutoComplete
