import React from "react";
import { User } from "../data/objects";
import { Button } from "../sharedComponents/Button";
import { Icon } from "../sharedComponents/Icon";
import { LineSeperator } from "../sharedComponents/LineSeperator";

interface Props {
  userData: User | null;
}
export const Aboutme: React.FC<Props> = ({ userData }) => {
  return (
    <>
      <h4>Description</h4>
      <p>{userData?.aboutme}</p>
      <LineSeperator type="horizontal" />
      <div className="container flex-row-justify-around">
        <Button data_type="container" data_bg="transparent">
          <Icon name="facebook" />
        </Button>
        <Button data_type="container" data_bg="transparent">
          <Icon name="instagram" />
        </Button>
        <Button data_type="container" data_bg="transparent">
          <Icon name="twitter" />
        </Button>
        <Button data_type="container" data_bg="transparent">
          <Icon name="whatsapp" />
        </Button>
      </div>
      <LineSeperator type="horizontal" />
      <h4>More Info</h4>
      <div className="container flex-row-justify-start">
        <Icon name="location" size="lg" />
        <p>
          {userData?.country}, {userData?.city}
        </p>
      </div>
      <div className="container flex-row-justify-start">
        <Icon name="info" size="lg" />
        <p>Joined since {userData?.joinedDate}</p>
      </div>
    </>
  );
};
