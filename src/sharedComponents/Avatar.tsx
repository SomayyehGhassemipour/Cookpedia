interface Props {
  classname: string,
  url: string,
  name: string,
  type: string
}
export const Avatar : React.FC<Props> = ({classname,url,name,type}) => {
  return (
      <img className={`${classname} ${type}`} src={url} alt={name}/>
  )
}