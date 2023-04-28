import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong,
  faArrowRightLong,
  faEllipsisVertical,
  faPen,faBell, 
  faBookBookmark, 
  faGear, 
  faHouse, 
  faPlus, 
  faFileLines, 
  faUser, faLocationDot, faGlobe, faCompass,faH} from '@fortawesome/free-solid-svg-icons'
import {faBookmark,faCommentDots} from '@fortawesome/free-regular-svg-icons'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

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
  else if (name==="home") 
    return <div>
      <FontAwesomeIcon icon={faHouse} size={'lg'}/>
    </div>
  else if (name==="discover") 
    return <div>
      <FontAwesomeIcon icon={faCompass} size={'lg'}/>
    </div>
  else if (name==="add") 
    return <div>
      <FontAwesomeIcon icon={faPlus} size={'lg'}/>
    </div>
  else if (name==="recipe") 
    return <div>
      <FontAwesomeIcon icon={faFileLines} size={'lg'}/>
    </div>
  else if (name==="profile") 
    return <div>
      <FontAwesomeIcon icon={faUser} size={'lg'}/>
    </div>
  else 
  return <div></div>
}