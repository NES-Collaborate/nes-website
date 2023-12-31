import { LANDING_PAGES } from "@/data/constants"
import Link from "next/link"
import { RiMenu2Fill } from "react-icons/ri"

export const LandingPageDropDown = () => {
  return (
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
  )
}
