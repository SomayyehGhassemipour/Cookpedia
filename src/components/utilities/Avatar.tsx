interface Props {
  url: string,
  name: string,
  type: string
}
export const Avatar : React.FC<Props> = ({url,name,type}) => {
  return (
      <img className={`avatar-image ${type}`} src={url} alt={name}/>
  )
}