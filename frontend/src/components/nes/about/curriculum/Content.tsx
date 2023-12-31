import Image from "next/image";

/**
 * NES' curricular grade
 * @returns {JSX.Element} Content
 */
export const Content = () => {
  return (
    <div className="w-full p-8">
      <h1 id="FuncionamentoPedagogico" className="text-4xl text-purple-nes mb-4">Funcionamento Pedagógico</h1>
      <div>
        <p className="mb-4">As aulas do NES ocorrerão às terças, quartas e sextas das 15h às 18:10, no do Campus A. C. Simões, Maceió-AL, em parceria com o Instituto de Matemática da Universidade Federal de Alagoas.</p>
        <p className="mb-4">As aulas do NES acontecerá em formato presencial. O formato remoto/online será destinado apenas para os/as alunos/as que passarem por análise de justificativa. As provas ocorerrão obrigatoriamente de forma presencial às sextas e aos sábados, informadas previamente aos alunos em calendário.</p>
        <p className="mb-4">A integralização do programa constará de 3 (três) etapas distribuídas das seguintes formas:</p>
        <ol className="list-decimal list-outside ml-4">
          <li className="mb-4">Os alunos que ingressarem no NES serão submetidos aos Módulos I e II, durante o primeiro ano do curso. Os aprovados nestes módulos e no primeiro ano do Ensino Médio, terão direito à certificação de Programação Básica e poderão participar do exame de acesso à certificação intermediária de Noções de Inteligência Artificial, sendo este exame a seleção de admissão ao curso de formação inicial e continuada do segundo ano.</li>
          <li className="mb-4">Os alunos aprovados no exame de admissão do segundo ano do curso serão submetidos aos Módulos III e IV. Os aprovados nestes módulos e no segundo ano do Ensino Médio, terão direito à certificação de Noções de Inteligência Artificial e poderão participar do exame de acesso à certificação intermediária de Noções de Ciência dos Dados, sendo este exame a seleção de admissão ao curso de formação inicial e continuada do segundo ano.</li>
          <li className="mb-4">Os alunos aprovados no exame de admissão do terceiro ano do curso serão submetidos aos Módulos V e VI. No final do Módulo VI, os alunos serão submetidos a um exame de conclusão que dará acesso à certificação intermediária de Noções de Ciências de Dados. Os alunos que concluírem o Ensino Médio, bem como as 200 horas de estágio realizadas através da prática profissional terão acesso à certificação Completa em Inteligência Artificial e Ciência dos Dados.</li>
        </ol>
      </div>

      <h1 id="Modulos" className="text-4xl text-purple-nes mb-4">Módulos</h1>
      <div className="flex justify-center w-full">
        <Image
          alt="Matriz Curricular do NES"
          className="max-w-3xl"
          src="/img/matriz-curricular.png"
          height={566}
          width={851}
        />
      </div>
    </div>
  )
}