import { useSession } from "@/contexts/session"
import { LANDING_PAGES } from "@/data/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoIosLogIn, IoIosLogOut } from "react-icons/io"
import { RiMenu2Fill } from "react-icons/ri"

export const NavBar = () => {
  const session = useSession()
  const pathname = usePathname()

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <RiMenu2Fill />
          </div>
          <ul className="menu menu-sm dropdown-content p-2 shadow bg-base-100 rounded-box w-52 z-[1]">
            {LANDING_PAGES.map((page, i) => (
              <li key={i}>
                <Link href={page.url}>
                  <page.icon /> {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Image
          alt="Logo"
          src="/img/NES - Horizontal Branco.png"
          width={(756 / 266) * 40}
          height={40}
        />
      </div>
      <div className="navbar-end">
        {pathname !== "/auth/login" && (
          <button className="btn btn-primary">
            {session.user ? (
              <>
                <IoIosLogOut />
                <Link href="/auth/logout">Sair</Link>
              </>
            ) : (
              <>
                <IoIosLogIn />
                <Link href="/auth/login">Entrar</Link>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
