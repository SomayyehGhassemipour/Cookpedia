interface Props {
  content ?: string
}
export const LineSeperator: React.FC<Props> = ({content}) => {
  return (
    <div style={{ borderTop: "1px solid #e2e2e2 "}}></div>
  )
}