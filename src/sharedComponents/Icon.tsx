import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faPen,
  faHouse,
  faPlus,
  faFileLines,
  faBars,
  faUser,
  faCompass,
  faEdit,
  faClock,
  faSearch,
  faXmark,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faShareFromSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

interface Props {
  name?: string;
  size?: "lg" | "sm" | "xs";
}
export const Icon: React.FC<Props> = ({ name, size }) => {
  if (name === "google")
    return (
      <div>
        <FontAwesomeIcon icon={faArrowLeftLong} size={size} />
      </div>
    );

  if (name === "comment")
    return (
      <div>
        <FontAwesomeIcon icon={faCommentAlt} size={size} />
      </div>
    );
  if (name === "search")
    return (
      <div>
        <FontAwesomeIcon icon={faSearch} size={size} />
      </div>
    );
  if (name === "location")
    return (
      <div
        style={{
          backgroundImage: "url(../icons8-location-28.png)",
          height: 28,
          width: 28,
        }}
      />
    );
  if (name === "info")
    return (
      <div
        style={{
          backgroundImage: "url(../icons8-info-28.png)",
          height: 28,
          width: 28,
        }}
      />
    );
  if (name === "whatsapp")
    return (
      <div
        style={{
          backgroundImage: "url(../icons8-whatsapp-28.png)",
          height: 28,
          width: 28,
        }}
      />
    );
  if (name === "twitter")
    return (
      <div
        style={{
          backgroundImage: "url(../icons8-twitter-28.png)",
          height: 28,
          width: 28,
        }}
      />
    );
  if (name === "instagram")
    return (
      <div
        style={{
          backgroundImage: "url(../icons8-instagram-28.png)",
          height: 28,
          width: 28,
        }}
      />
    );
  if (name === "facebook")
    return (
      <div
        style={{
          backgroundImage: "url(../icons8-facebook-28.png)",
          height: 28,
          width: 28,
        }}
      />
    );
  if (name === "back")
    return (
      <div>
        <FontAwesomeIcon icon={faArrowLeftLong} size={size} />
      </div>
    );
  if (name === "clock")
    return (
      <div>
        <FontAwesomeIcon icon={faClock} size={size} />
      </div>
    );
  else if (name === "edit")
    return (
      <div>
        <FontAwesomeIcon icon={faPen} size={size} />
      </div>
    );
  else if (name === "home")
    return (
      <div>
        <FontAwesomeIcon icon={faHouse} size={size} />
      </div>
    );
  else if (name === "discover")
    return (
      <div>
        <FontAwesomeIcon icon={faCompass} size={size} />
      </div>
    );
  else if (name === "add")
    return (
      <div>
        <FontAwesomeIcon icon={faPlus} size={size} />
      </div>
    );
  else if (name === "recipe")
    return (
      <div>
        <FontAwesomeIcon icon={faFileLines} size={size} />
      </div>
    );
  else if (name === "profile")
    return (
      <div>
        <FontAwesomeIcon icon={faUser} size={size} />
      </div>
    );
  else if (name === "edit")
    return (
      <div>
        <FontAwesomeIcon icon={faEdit} size={size} />
      </div>
    );
  else if (name === "settings")
    return (
      <div>
        <FontAwesomeIcon icon={faBars} size={size} />
      </div>
    );
  else if (name === "close")
    return (
      <div>
        <FontAwesomeIcon icon={faXmark} size={size} />
      </div>
    );
  else if (name === "share")
    return (
      <div>
        <FontAwesomeIcon icon={faShareFromSquare} size={size} />
      </div>
    );
  else if (name === "trash")
    return (
      <div>
        <FontAwesomeIcon icon={faTrashCan} size={size} />
      </div>
    );
  else return <div></div>;
};
