import { LANDING_PAGES } from "@/data/constants"
import Link from "next/link"
import { RiMenu2Fill } from "react-icons/ri"

/**
 * Dropdown with links to landing pages. (links from `data/constants.ts`)
 * @returns {JSX.Element} DropDown for Landing Page
 */
const NavBarDropDown = () => {
  return (
    <details className="dropdown dropdown-hover">
      <summary className="btn btn-ghost btn-circle">
        <RiMenu2Fill />
      </summary>
      <ul className="menu menu-sm dropdown-content p-2 shadow bg-base-100 rounded-box w-52 z-[1]">
        {LANDING_PAGES.map((page, i) => (
          <li key={i}>
            <Link href={page.url}>
              <page.icon /> {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default NavBarDropDown
