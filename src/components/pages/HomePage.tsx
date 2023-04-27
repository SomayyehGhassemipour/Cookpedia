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
      <Card classname={"flex-justify-start"}>
        <Header>
          <div className="flex-row">
            <Button data_type={'icon'} clickHandler={() => navigate("/")}>
              <Icon name="back"/>
            </Button>
            <ProgressBar progress={100}/>
          </div>
        </Header>
        <CardBody>
          <h1>Hello <p>{auth.currentUser?.displayName}</p></h1>
          </CardBody>
        <CardAction>
        <Button  data_type={'primary'} clickHandler={signOutHandler}>
            <p>Sign out</p>
          </Button>
        </CardAction>
      </Card>  
    </div>
  )
}