import ButtonNES from "@/components/ButtonNES"
import { RiInstagramFill } from "react-icons/ri"
import { FaYoutube } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

/**
 * Links to the contacts
 * @returns {JSX.Element} Contacts
 */
const Contacts = () => {
  return (
    <div className="flex flex-col items-center">
      <ButtonNES
        type="navigation"
        style="ghost"
        className="text-primary hover:bg-transparent flex flex-row mb-2"
        href="https://www.instagram.com/nes.ufal/"
        target="_blank"
      >
        <RiInstagramFill fontSize="1.25em" />
        Siga nosso Instagram!
      </ButtonNES>
      <ButtonNES
        type="navigation"
        style="ghost"
        className="text-primary hover:bg-transparent flex flex-row mb-2"
        href="https://www.youtube.com/@novoensinosuplementar"
        target="_blank"
      >
        <FaYoutube fontSize="1.25em" />
        Inscreva-se em nosso canal no YouTube!
      </ButtonNES>
      <ButtonNES
        type="navigation"
        style="ghost"
        className="text-primary hover:bg-transparent flex flex-row mb-2"
        href="mailto:nes.alagoas@gmail.com"
        target="_blank"
      >
        <MdEmail fontSize="1.25em" />
        Envie-nos um email!
      </ButtonNES>
    </div>
  )
}

export default Contacts
