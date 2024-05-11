import ButtonNES from "@/components/ButtonNES"
import { Notice } from "@/types/constants"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import NoticeCard from "./NoticeCard"

type Props = {
  notices: Notice[]
}

const HorizontalScroll = ({ notices }: Props) => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-base-200 w-full rounded-lg">
      <h1 className="text-primary text-center text-2xl stroke-1 sticky top-4">Postagens</h1>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {notices.map((notice, i) => (
            <div key={i} className="group transform transition-transform hover:scale-105">
              <NoticeCard notice={notice} />
            </div>
          ))}
        </motion.div>
        <div className="join join-vertical sticky right-4 h-full flex justify-end pb-4">
          <ButtonNES type="navigation" style="fill" className="btn join-item" href="#">
            <IoIosArrowUp className="text-xl" />
          </ButtonNES>
          <ButtonNES
            type="navigation"
            style="fill"
            className="btn join-item"
            href="#ProjectMission"
          >
            <IoIosArrowDown className="text-xl" />
          </ButtonNES>
        </div>
      </div>
    </section>
  )
}

export default HorizontalScroll
