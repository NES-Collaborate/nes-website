import { useBackend } from "@/contexts/backend"
import { useSession } from "@/contexts/session"
import { User } from "@/types/user"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { Input, InputProps } from "react-daisyui"
import Loading from "../Loading"

interface Props extends InputProps {
  setTargetUser: (user: User | null) => void
  targetUser: User | null
}

const UserSearchInput = ({ targetUser, setTargetUser, ...inputProps }: Props) => {
  const [inputValue, setInputValue] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const { backend } = useBackend()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(targetUser?.name || "")
  }, [targetUser])

  useEffect(() => {
    if (!inputValue) return
    if (targetUser) return

    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await backend.get("/admin/users", {
          params: {
            q: inputValue,
          },
        })

        // TODO: Add validation here
        setUsers(res.data.users as User[])
      } catch (err: unknown) {
        // TODO: Set some error messa here
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(() => fetchUsers(), 500)

    return () => clearTimeout(timer)
  }, [inputValue, backend, targetUser])

  const handleSelectUser = (user: User) => {
    setInputValue(user.name)
    setTargetUser(user)
    setUsers([])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (users.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex((prevIndex) => (prevIndex + 1) % users.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setActiveIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length)
        break
      case "Enter":
        e.preventDefault()
        handleSelectUser(users[activeIndex])
    }
  }

  return (
    <div className="relative mb-4">
      <Input
        ref={inputRef}
        {...inputProps}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value.trim())
          setActiveIndex(-1)
          setTargetUser(null)
          if (e.target.value.trim() === "") setUsers([])
        }}
        onKeyDown={handleKeyDown}
        className="w-full"
      />
      {loading && (
        <div className="absolute top-full mt-2 border border-base-300 shadow-lg rounded w-full bg-base-100/90">
          <Loading text="Carregando usuários..." />
        </div>
      )}
      {!loading && users.length > 0 && (
        <div className="absolute top-full mt-2 border border-base-300 shadow-lg rounded w-full bg-base-100/90">
          <ul>
            {users.map((user, index) => (
              <li
                key={user.id}
                className={clsx(
                  "p-2 cursor-pointer",
                  index === activeIndex && "bg-base-200"
                )}
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserSearchInput
