import ButtonNES from "@/components/ButtonNES"
import Image from "next/image"

/**
 * Links to the contacts
 * @returns {JSX.Element} Contacts
 */
const Contacts = () => {
  return (
    <div className="flex flex-col items-start ml-8">
      <ButtonNES
        type="navigation"
        style="ghost"
        className="text-primary hover:bg-transparent flex flex-row text-lg mb-2"
        href="https://www.instagram.com/nes.ufal/"
        target="_blank"
      >
        <Image
          src="/img/instagram_white.png"
          alt="Instagram"
          className="bg-primary rounded-full mr-1"
          width="30"
          height="30"
        ></Image>
        Siga nosso Instagram!
      </ButtonNES>
      <ButtonNES
        type="navigation"
        style="ghost"
        className="text-primary hover:bg-transparent flex flex-row text-lg mb-2"
        href="https://www.youtube.com/@novoensinosuplementar"
        target="_blank"
      >
        <Image
          src="/img/youtube_white.png"
          alt="YouTube"
          className="bg-primary rounded-full mr-1"
          width="30"
          height="30"
        ></Image>
        Inscreva-se em nosso canal no YouTube!
      </ButtonNES>
      <ButtonNES
        type="navigation"
        style="ghost"
        className="text-primary hover:bg-transparent flex flex-row text-lg mb-2"
        href="mailto:nes.alagoas@gmail.com"
        target="_blank"
      >
        <Image
          src="/img/email_white.png"
          alt="Email"
          className="bg-primary rounded-full mr-1"
          width="30"
          height="30"
        ></Image>
        Envie-nos um email!
      </ButtonNES>
    </div>
  )
}

export default Contacts
