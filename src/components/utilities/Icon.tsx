import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong,
  faArrowRightLong,
  faEllipsisVertical,
  faPen,faBell, 
  faBookBookmark, 
  faGear, 
  faHouse, 
  faPlus, 
  faFileLines, faBars,
  faUser, faLocationDot, faGlobe, faCompass,faH,faEdit,faShareNodes, faXmark} from '@fortawesome/free-solid-svg-icons'
import {faBookmark,faCommentDots,faShareFromSquare,faPenToSquare,faTrashCan} from '@fortawesome/free-regular-svg-icons'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

interface Props {
  name: string,
  size: 'lg' | 'sm'|'xs',
}
export const Icon : React.FC<Props> = ({name, size}) => {
  if(name==="google") 
    return <div>
      <FontAwesomeIcon icon={faArrowLeftLong} size={size} />
    </div>
  if(name==="back") 
    return <div>
      <FontAwesomeIcon icon={faArrowLeftLong} size={size}/>
    </div>
  else if (name==="edit") 
    return <div>
      <FontAwesomeIcon icon={faPen} size={size} />
    </div>
  else if (name==="home") 
    return <div>
      <FontAwesomeIcon icon={faHouse} size={size}/>
    </div>
  else if (name==="discover") 
    return <div>
      <FontAwesomeIcon icon={faCompass} size={size}/>
    </div>
  else if (name==="add") 
    return <div>
      <FontAwesomeIcon icon={faPlus} size={size}/>
    </div>
  else if (name==="recipe") 
    return <div>
      <FontAwesomeIcon icon={faFileLines} size={size}/>
    </div>
  else if (name==="profile") 
    return <div>
      <FontAwesomeIcon icon={faUser} size={size}/>
    </div>
    else if (name==="edit") 
    return <div>
      <FontAwesomeIcon icon={faEdit} size={size}/>
    </div>
    else if (name==="settings") 
    return <div>
      <FontAwesomeIcon icon={faBars} size={size}/>
    </div>
    else if (name === "close")
    return <div>
      <FontAwesomeIcon icon={faXmark} size={size}/>
    </div>
    else if (name==="share") 
    return <div>
      <FontAwesomeIcon icon={faShareFromSquare} size={size}/>
    </div>
    else if (name==="trash") 
    return <div>
      <FontAwesomeIcon icon={faTrashCan} size={size}/>
    </div>
  else 
  return <div></div>
}