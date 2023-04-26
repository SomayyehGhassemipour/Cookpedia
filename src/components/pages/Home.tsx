import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../redux/firebase";
import { Button } from "../utilities/Button";
import { Icon } from "../utilities/Icon";

export default function Home() {

  let navigate = useNavigate();
  
  const signOutHandler = async () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      // An error happened.
    });
  }
  return(
    <div>
      <Button data_type={'icon'} clickHandler={signOutHandler}>
        <Icon name="back"/>
      </Button>
      <h1>Home</h1>
      <h2>Welcome {auth?.currentUser?.displayName}</h2>
    </div>
  )
}