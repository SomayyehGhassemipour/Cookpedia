import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { auth } from "../../redux/firebase"
import { Avatar } from "../utilities/Avatar";
import { Button } from "../utilities/Button"
import { Card } from "../utilities/card/Card"
import { CardAction } from "../utilities/card/CardAction"
import { CardBody } from "../utilities/card/CardBody"
import { Header } from "../utilities/Header"
import { Icon } from "../utilities/Icon"
import { LineSeperator } from "../utilities/LineSeperator";
import { ProgressBar } from "../utilities/ProgressBar";

export const ProfilePage : React.FC = () => {
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
            <h2>Profile</h2>
          <img src = "icons8-share.svg" alt="share"/>
          <img src = "icons8-settings-28.svg" alt="settings"/>
          {/* <a href="https://ibb.co/KxMk5K6">
            <img src="https://i.ibb.co/KxMk5K6/IMG-20220418-0958112.jpg" alt="IMG-20220418-0958112" />
            </a> */}
          </div>
          
        </Header>
        <CardBody>
          <div className="flex-row">
            <div className="profile-avatar">
              <Avatar classname={"avatar-profile"} url={"user.png"} name={"AC"} type={"avatar-circle"} />
            </div>
            <div className="flex-align-start">
              <h2>{auth.currentUser?.displayName}</h2>
              <p>{auth.currentUser?.email}</p>
            </div>
          </div>
          <LineSeperator type="horizontal"/>
          <div className="flex-row flex-justify-space-around">
            <div className="flex-column-center">
              <h3>125</h3>
              <p>recipies</p>
            </div>
            <LineSeperator type="vertical"/>
            <div className="flex-column-center">
              <h3>104</h3>
              <p>following</p>
            </div>
            <LineSeperator type="vertical"/>
            <div className="flex-column-center">
              <h3>2k</h3>
              <p>followers</p>
            </div>
          </div>
          <LineSeperator type="horizontal"/>
          <div className="flex-row">
            <Button data_type={'container'} >
              <h4>Recipes</h4>
            </Button>
            <Button data_type={'container'} >
              <h4>About</h4>
            </Button>
          </div>
          <LineSeperator type="horizontal"/>
          {/* <h1>Hello <p>{auth.currentUser?.displayName}</p></h1> */}
          </CardBody>
        <CardAction>
          <div className="flex-row flex-justify-space-around">
            <Button data_type={'icon'} >
              <Icon name="home"/>
              <p>Home</p>
            </Button>
            <Button data_type={'icon'} >
              <Icon name="discover"/>
              <p>Discover</p>
            </Button>
            <Button data_type={'icon'} >
              <Icon name="add"/>
            </Button>
            <Button data_type={'icon'} >
              <Icon name="recipe"/>
              <p>My Recipes</p>
            </Button>
            <Button data_type={'icon'} >
              <Icon name="profile"/>
              <p>Profile</p>
            </Button>
          </div>
        </CardAction>
      </Card>  
    </div>
  )
}