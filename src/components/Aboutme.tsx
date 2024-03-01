import React from "react";
import { Link } from "react-router-dom";
import { ConvertTimestamp } from "../helpers/Time";
import { User } from "../model/User";
import { Icon } from "../sharedComponents/Icon";
import { LineSeperator } from "../sharedComponents/LineSeperator";

interface Props {
  userData: User | null;
}
export const Aboutme: React.FC<Props> = ({ userData }) => {
  return (
    <>
      {userData?.aboutme && (
        <>
          <h4>Description</h4>
          <p>{userData?.aboutme}</p>
          <LineSeperator type="horizontal" />
        </>
      )}
      <>
        <h4>More Info</h4>
        <div className="container flex-row-justify-start">
          <Icon name="location" size="lg" />
          <p>
            {userData?.country}, {userData?.city}
          </p>
        </div>
        <div className="container flex-row-justify-start">
          <Icon name="info" size="lg" />
          <p>Joined since {ConvertTimestamp(userData?.joinedOn as number)}</p>
        </div>
        {userData?.facebook && (
          <div className="container flex-row-justify-start">
            <Link to={userData?.facebook as string} target="_blank">
              <Icon name="facebook" />
            </Link>
            <p>{userData?.facebook}</p>
          </div>
        )}

        {userData?.instagram && (
          <div className="container flex-row-justify-start">
            <Link to={userData?.instagram as string} target="_blank">
              <Icon name="instagram" />
            </Link>
            <p>{userData?.instagram}</p>
          </div>
        )}
        {userData?.twitter && (
          <div className="container flex-row-justify-start">
            <Link to={userData?.twitter as string} target="_blank">
              <Icon name="twitter" />
            </Link>
            <p>{userData?.twitter}</p>
          </div>
        )}
      </>
    </>
  );
};
