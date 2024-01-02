import { Loading } from "@/components/Loading"

const About = () => {
  return (
    <div className="h-[75vh]">
      <Loading text="Redirecionando..." textClassName="ml-3 text-2xl" center />
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
