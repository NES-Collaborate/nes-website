import { useSession } from "@/contexts/session"
import { USER_PAGES } from "@/data/constants"
import { User } from "@/types/user"
import Image from "next/image"
import Link from "next/link"


/**
 * Logged user dropdown that show the profile photo and name and links to the pages the user can access.
 * @returns DropDown for Logged User
 */
const LoggedUserDropDown = () => {
  const { user } = useSession()
  const profilePhoto = user?.photo || "/img/default-user.png"
  const userPages = USER_PAGES.filter((page) =>
    page.allowedUserTypes.includes(user?.type as User["type"])
  )

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-light">Olá, {user?.name}</span>
      <details className="dropdown dropdown-end">
        <summary className="btn btn-circle">
          <Image
            src={profilePhoto}
            alt={`${user?.name} profile photo`}
            width={40}
            height={40}
            className="rounded-full"
          ></Image>
        </summary>
        <ul className="menu menu-sm dropdown-content p-2 shadow bg-base-100 rounded-box w-52 z-[1]">
          {userPages.map((page, i) => (
            <li key={i}>
              <Link href={page.url}>
                <page.icon /> {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}

export default LoggedUserDropDown
