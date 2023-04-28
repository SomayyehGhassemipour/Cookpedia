interface Props {
  type : "vertical" | "horizontal",
  content ?: string 
}
export const LineSeperator: React.FC<Props> = ({type, content}) => {
  return (
    <>
       {type ==="vertical" ?
         <div style={{ height: "100%",borderLeft: "1px solid #f2f2f2 "}}/>
       : content ? 
        <div className="flex-row">
          <div style={{ width: "30%",borderTop: "1px solid #f2f2f2 "}}/>
          <p className="text-neutral-500">{content}</p>
          <div style={{ width: "30%",borderTop: "1px solid #f2f2f2 "}}/>
        </div>
        : <div style={{ width: "100%",borderTop: "1px solid #f2f2f2 "}}/>
       }
    </>
  )
}