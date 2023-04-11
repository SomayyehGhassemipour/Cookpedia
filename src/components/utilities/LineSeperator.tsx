interface Props {
  content ?: string 
}
export const LineSeperator: React.FC<Props> = ({content}) => {
  return (
    <div >
       {content ? 
        <div className="flex-row">
          <div style={{ width: "30%",borderTop: "1px solid #e2e2e2 "}}/>
          <p className="text-neutral-500">{content}</p>
          <div style={{ width: "30%",borderTop: "1px solid #e2e2e2 "}}/>
        </div>
        : <div style={{ width: "100%",borderTop: "1px solid #e2e2e2 "}}/>
       }
    </div>
  )
}