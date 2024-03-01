import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../model/User";
import { Button } from "../../sharedComponents/Button";
import { LineSeperator } from "../../sharedComponents/LineSeperator";
import { List } from "../../sharedComponents/list/List";
import { Loading } from "../../sharedComponents/Loading";
import { UserCard } from "./UserCard";
interface Props {
  users: User[];
}
export const UserList: React.FC<Props> = ({ users }) => {
  const navigate = useNavigate();

  if (!users) return <Loading />;
  return (
    <List>
      <div className="flex-row-wrap">
        {users.map((user) => (
          <>
            <Button
              key={user.userID}
              data_type="container"
              data_bg="transparent"
              data_width="full"
              clickHandler={() => navigate(`/user/user-profile/${user.userID}`)}
            >
              <UserCard
                avatar={user?.avatar}
                fullname={user?.fullname}
                userName={user?.userName}
                type="None"
                avatarSize="sm"
              />
            </Button>
            <LineSeperator type="horizontal" />
          </>
        ))}
      </div>
    </List>
  );
};
