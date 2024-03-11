import Loading from "@/components/Loading"
import clsx from "clsx"
import { InputHTMLAttributes, forwardRef, useEffect, useRef, useState } from "react"
import { Tooltip } from "react-daisyui"
import { FiInfo } from "react-icons/fi"

type Suggestion = {
  label: string
  value: string
}

type AutoCompleteInputProps = {
  label: string
  helpText?: string
  errors?: {
    message?: string
  }
  fetchSuggestions: (query: string) => Promise<Suggestion[]>
  renderSuggestion?: (suggestion: Suggestion) => React.ReactNode
  onSuggestionSelect: (suggestion: Suggestion) => void
  type?: InputHTMLAttributes<HTMLInputElement>["type"]
  name?: InputHTMLAttributes<HTMLInputElement>["name"]
}

const AutoCompleteInputBase = ({
  label,
  helpText,
  errors,
  renderSuggestion = (s) => s.label,
  onSuggestionSelect,
  fetchSuggestions,
  ...rest
}: AutoCompleteInputProps, ref: any) => {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null)

  useEffect(() => {
    if (!query) {
      setLoading(false)
      setSuggestions([])
      setSelectedSuggestion(null)
      return
    }
    if (selectedSuggestion) return

    if (query && activeIndex !== -1) return

    const fetchSug = async () => {
      setLoading(true)
      try {
        const fetchedSuggestions = await fetchSuggestions(query)
        if (inputRef.current?.value === query) {
          setSuggestions(fetchedSuggestions)
        }
      } catch (error) {
        console.error("Failed to fetch suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    const debounceDelay = 500
    const handler = setTimeout(fetchSug, debounceDelay)

    return () => clearTimeout(handler)
  }, [query, fetchSuggestions, activeIndex, selectedSuggestion])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setActiveIndex(-1)
  }

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion.label
    }
    setQuery(suggestion.label)
    onSuggestionSelect(suggestion)
    setSelectedSuggestion(suggestion)
    setSuggestions([])
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && suggestions.length > 0) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % suggestions.length)
      event.preventDefault()
    } else if (event.key === "ArrowUp" && suggestions.length > 0) {
      setActiveIndex(
        (prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length
      )
      event.preventDefault()
    } else if (event.key === "Enter" && activeIndex >= 0) {
      handleSelectSuggestion(suggestions[activeIndex])
      event.preventDefault()
    }
  }

  return (
    <div className="form-control relative w-full max-w-lg">
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
        ref={inputRef}
        className="input input-bordered w-full"
        {...rest}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />

      {errors?.message && (
        <label className="label">
          <span className="label-text-alt text-error">{errors.message}</span>
        </label>
      )}

      {loading && <Loading center />}

      {!loading && suggestions.length > 0 && (
        <ul className="absolute z-10 max-h-60 overflow-auto border border-base-300 shadow-lg rounded-md bg-base-100 w-full mt-1 p-2">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.value}
              className={clsx(
                "cursor-pointer hover:bg-base-200",
                index === activeIndex && "bg-base-200"
              )}
              onMouseDown={() => handleSelectSuggestion(suggestion)}
            >
              {renderSuggestion(suggestion)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const AutoCompleteInput = forwardRef(AutoCompleteInputBase)
