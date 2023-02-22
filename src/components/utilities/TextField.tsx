interface Props {
  textholder: string;
}
export const TextField : React.FC<Props> = ({textholder}) => {
  return (
    <input className="textField" type="text" placeholder={textholder}/>
  )
}