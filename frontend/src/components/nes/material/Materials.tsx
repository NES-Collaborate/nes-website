import MaterialCard from "./MaterialCard"

/**
 * List of NES' materials
 * @returns {JSX.Element} Materials
 */
const Materials = () => {
  return (
    <div>
      <MaterialCard
        imageUrl="/img/circle.png"
        title="Material do NES"
        description="Descrição do material"
        url="https://www.youtube.com/embed/videoseries?si=MXpRF50Gs32Qzghc&amp;list=PLh-8fk3VvocCsrI-mRnxk9Fd2hNAiLVbD"
      />
      <MaterialCard
        imageUrl="/img/circle.png"
        title="Material do NES"
        description="Descrição do material"
        url="https://drive.google.com/file/d/1immcmC25h8rXU43qcLQ1WiMO4OkAjmtQ/preview"
      />
    </div>
  )
}

export default Materials
