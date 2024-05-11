import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  id: number
  imagePath: string
  name: string
  city: string
  results: string
  difficulties: string
  phrase: string
}

/**
 * A card showing a success case
 * @param {number} id Identify a unique success case
 * @param {string} imagePath Path to the image file
 * @param {string} name Name of the person
 * @param {string} city Place where it lives
 * @param {string} results List of things it conquered
 * @param {string} difficulties List of problems it happened
 * @param {string} phrase Personal phrase
 * @returns {JSX.Element} SuccessCase
 */
const SuccessCase = ({
  id,
  imagePath,
  name,
  city,
  results,
  difficulties,
  phrase,
}: Props): JSX.Element => {
  const [direction, setDirection] = useState("")

  useEffect(() => {
    if (id % 2 === 0) {
      setDirection(`md:flex-row-reverse`)
    } else {
      setDirection(`md:flex-row`)
    }
  }, [id])

  return (
    <div className="hero bg-base-200 mb-4 p-2 rounded-lg !w-max max-w-full">
      <div
        className={clsx(
          direction,
          "hero-content flex-col py-8 px-4 w-full flex justify-center items-center"
        )}
      >
        <Image
          alt="foto aluno"
          width={500}
          height={500}
          src={imagePath}
          className="max-w-xs rounded-lg shadow-2xl"
        />
        <div className="px-4">
          <h1 className="text-5xl text-primary font-bold">{name}</h1>
          <h2 className="text-2xl mb-8 text-secondary">{city}</h2>
          <div className="flex flex-row flex-wrap justify-evenly">
            <div className="flex flex-col w-2/5">
              <span className="font-bold text-primary">Conquistas:</span>
              <p>{results}</p>
            </div>
            <div className="flex flex-col w-2/5">
              <span className="font-bold text-primary">Dificuldades:</span>
              <p>{difficulties}</p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center mt-8">
            <p className="text-xl text-secondary font-serif italic text-center">
              &quot;{phrase}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessCase
