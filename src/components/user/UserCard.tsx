import React from "react";
import { Avatar } from "../../sharedComponents/Avatar";
import { Button } from "../../sharedComponents/Button";
import { Icon } from "../../sharedComponents/Icon";

interface Props {
  avatar: string;
  fullname: string | undefined;
  userName: string | undefined;
  type: "Follow" | "Following" | "Edit" | "None";
  avatarSize: "xs" | "sm" | "lg";
  clickHandler?: any;
}
export const UserCard: React.FC<Props> = ({
  avatar,
  fullname,
  userName,
  type,
  avatarSize,
  clickHandler,
}) => {
  return (
    <div className="container flex-row-justify-start">
      <div className="profile-avatar">
        <Avatar
          classname="avatar-profile"
          image={avatar ? avatar : "../user.png"}
          name="AC"
          type={"circle"}
          size={avatarSize}
        />
      </div>
      <div className="flex-align-start">
        <h3>{fullname}</h3>
        <p className="text-neutral-600">{userName}</p>
      </div>
      {type !== "None" && (
        <div className="ml-auto">
          <Button
            data_bg="google"
            data_type="container"
            clickHandler={clickHandler}
          >
            <div className="flex-row-justify-around">
              {type === "Edit" && <Icon name="edit" size="xs" />}
              <p>{type}</p>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};
