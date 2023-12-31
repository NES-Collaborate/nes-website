import { Loading } from "react-daisyui"

const About = () => {
  return (
    <div className="flex items-center justify-center h-[75vh]">
      <Loading />
      <span className="ml-3 text-2xl">Redirecionando...</span>
    </div>
  )
}
export default About

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/nes/about/learn-more",
      permanent: false,
    },
  }
}
