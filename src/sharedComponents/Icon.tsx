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
  faClock,
  faSearch,
  faXmark,
  faCommentAlt,
  faBookmark as faBookmarked
} from "@fortawesome/free-solid-svg-icons";
import {
  faShareFromSquare,
  faTrashCan,
  faBookmark,
  faBell,
} from "@fortawesome/free-regular-svg-icons";
import mockData from "../data/mockData.json";

interface Props {
  name?: string;
  size?: "lg" | "sm" | "xs";
}
export const Icon: React.FC<Props> = ({ name, size }) => {
  switch (name) {
    case "unbookmark":
      return (
        <div>
          <FontAwesomeIcon icon={faBookmarked} size={size} />
        </div>
      );
    case "bookmark":
      return (
        <div>
          <FontAwesomeIcon icon={faBookmark} size={size} />
        </div>
      );
    case "notification":
      return (
        <div>
          <FontAwesomeIcon icon={faBell} size={size} />
        </div>
      );
    case "commnet":
      return (
        <div>
          <FontAwesomeIcon icon={faCommentAlt} size={size} />
        </div>
      );
    case "search":
      return (
        <div>
          <FontAwesomeIcon icon={faSearch} size={size} />
        </div>
      );
    case "location":
      return (
        <div
          style={{
            backgroundImage: "url(../icons8-location-28.png)",
            height: mockData.ICON_SIZE_SM,
            width: mockData.ICON_SIZE_SM,
          }}
        />
      );
    case "info":
      return (
        <div
          style={{
            backgroundImage: "url(../icons8-info-28.png)",
            height: mockData.ICON_SIZE_SM,
            width: mockData.ICON_SIZE_SM,
          }}
        />
      );
    case "whatsapp":
      return (
        <div
          style={{
            backgroundImage: "url(../icons8-whatsapp-28.png)",
            height: mockData.ICON_SIZE_SM,
            width: mockData.ICON_SIZE_SM,
          }}
        />
      );
    case "twitter":
      return (
        <div
          style={{
            backgroundImage: "url(../icons8-twitter-28.png)",
            height: mockData.ICON_SIZE_SM,
            width: mockData.ICON_SIZE_SM,
          }}
        />
      );
    case "instagram":
      return (
        <div
          style={{
            backgroundImage: "url(../icons8-instagram-28.png)",
            height: mockData.ICON_SIZE_SM,
            width: mockData.ICON_SIZE_SM,
          }}
        />
      );
    case "apple":
      return (
        <div
          style={{
            backgroundImage: "url(icons8-apple-logo-28.png)",
            height: mockData.ICON_SIZE_SM,
            width: mockData.ICON_SIZE_SM,
          }}
        />
      );
    case "google":
      return (
        <div
          style={{
            backgroundImage: "url(icons8-google-28.png)",
            height: mockData.ICON_SIZE_SM,
            width: mockData.ICON_SIZE_SM,
          }}
        />
      );
    case "facebook":
      return (
        <div
          style={{
            backgroundImage: "url(../icons8-facebook-28.png)",
            height: mockData.ICON_SIZE_SM,
            width: mockData.ICON_SIZE_SM,
          }}
        />
      );
    case "back":
      return (
        <div>
          <FontAwesomeIcon icon={faArrowLeftLong} size={size} />
        </div>
      );
    case "clock":
      return (
        <div>
          <FontAwesomeIcon icon={faClock} size={size} />
        </div>
      );
    case "edit":
      return (
        <div>
          <FontAwesomeIcon icon={faPen} size={size} />
        </div>
      );
    case "home":
      return (
        <div>
          <FontAwesomeIcon icon={faHouse} size={size} />
        </div>
      );
    case "discover":
      return (
        <div>
          <FontAwesomeIcon icon={faCompass} size={size} />
        </div>
      );
    case "add":
      return (
        <div>
          <FontAwesomeIcon icon={faPlus} size={size} />
        </div>
      );
    case "recipe":
      return (
        <div>
          <FontAwesomeIcon icon={faFileLines} size={size} />
        </div>
      );
    case "profile":
      return (
        <div>
          <FontAwesomeIcon icon={faUser} size={size} />
        </div>
      );
    case "settings":
      return (
        <div>
          <FontAwesomeIcon icon={faBars} size={size} />
        </div>
      );
    case "close":
      return (
        <div>
          <FontAwesomeIcon icon={faXmark} size={size} />
        </div>
      );
    case "share":
      return (
        <div>
          <FontAwesomeIcon icon={faShareFromSquare} size={size} />
        </div>
      );
    case "trash":
      return (
        <div>
          <FontAwesomeIcon icon={faTrashCan} size={size} />
        </div>
      );
    default:
      return <div></div>;
  }
};
