import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { auth } from "../../redux/firebase"
import { Button } from "../utilities/Button"
import { Card } from "../utilities/card/Card"
import { CardAction } from "../utilities/card/CardAction"
import { CardBody } from "../utilities/card/CardBody"
import { Header } from "../utilities/Header"
import { Icon } from "../utilities/Icon"
import { ProgressBar } from "../utilities/ProgressBar";

export const HomePage : React.FC = () => {
  let navigate = useNavigate();
  
  const signOutHandler = async () => {
    if(auth.currentUser)
      signOut(auth).then(() => {
        navigate("/");
      }).catch((error) => {
        console.error(error);
      });
  }
  console.log(auth.currentUser?.displayName);
  return(
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row">
          {/* <a href="https://ibb.co/KxMk5K6">
            <img src="https://i.ibb.co/KxMk5K6/IMG-20220418-0958112.jpg" alt="IMG-20220418-0958112" />
            </a> */}
          </div>
        </Header>
        <CardBody>
          <h1>Hello <p>{auth.currentUser?.displayName}</p></h1>
          </CardBody>
        <CardAction>
        <Button data_type={'container'} data_bg={'primary'} clickHandler={signOutHandler}>
            <p>Sign out</p>
          </Button>
        </CardAction>
      </Card>  
    </div>
  )
}