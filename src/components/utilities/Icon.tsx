import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

interface Props {
  name: string,
}
export const Icon : React.FC<Props> = ({name}) => {
  if(name=="back") 
    return <FontAwesomeIcon icon={faArrowLeftLong} />
  else 
    return <div></div>
}