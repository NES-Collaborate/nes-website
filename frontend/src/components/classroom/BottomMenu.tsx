import { Classroom } from "@/types/entities"
import { cn } from "@/utils/client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { useEffect, useState } from "react"
import {  FaHome, FaTasks, FaUsers } from "react-icons/fa"

type Props = {
  classrooom?: Classroom
}

const BottomMenu = ({ classrooom }: Props) => {
  const [active, setActive] = useState<"posts" | "activities" | "members">("posts")

  const pathname = usePathname()

  useEffect(() => {
    if (pathname.includes("activities")) {
      setActive("activities")
    } else if (pathname.includes("members")) {
      setActive("members")
    } else {
      setActive("posts")
    }
  }, [pathname])

  const icon: Record<string, JSX.Element> = {
    posts: <FaHome className="size-4 mb-1" />,
    activities: <FaTasks className="size-4 mb-1" />,
    members: <FaUsers className="size-4 mb-1" />,
  }

  const label: Record<string, string> = {
    posts: "Postagens",
    activities: "Atividades",
    members: "Membros",
  }

  return (
    <ul className="fixed bottom-0 left-0 right-0 menu bg-base-200 rounded-t-box text-white menu-horizontal justify-around">
      {["posts", "activities", "members"].map((page) => (
        <li key={page} className={cn(active === page && "border-b-2 rounded-b border-b-secondary")}>
          <Link
            href={`/classroom/${classrooom?.id}/${page === "posts" ? "" : page}`}
            className="flex flex-col justify-center items-center"
          >
            {icon[page]}
            <span className="text-xs">{label[page]}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default BottomMenu
