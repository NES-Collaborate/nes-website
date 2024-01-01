type Props = {
  title: string
  children: React.ReactNode
}

/**
 * Collapsible item
 * @param title Title of the collapsible
 * @param children Children of the collapsible (the content)
 * @returns
 */
export const Collapsible = ({ title, children }: Props) => {
  return (
    <div className="collapse collapse-plus mb-4">
      <input type="checkbox" />
      <div className="collapse-title text-2xl font-semibold text-purple-nes">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  )
}
