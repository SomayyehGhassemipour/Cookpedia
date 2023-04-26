import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong,faPen } from '@fortawesome/free-solid-svg-icons'

interface Props {
  name: string,
}
export const Icon : React.FC<Props> = ({name}) => {
  if(name==="google") 
    return <div>
      <FontAwesomeIcon icon={faArrowLeftLong} />
    </div>
  if(name==="back") 
    return <div>
      <FontAwesomeIcon icon={faArrowLeftLong} />
    </div>
  else if (name==="edit") 
    return <div>
      <FontAwesomeIcon icon={faPen} />
    </div>
  else 
  return <div></div>
}