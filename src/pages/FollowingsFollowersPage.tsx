import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserList } from "../components/user/UserList";
import { getFollowersFollowingsData } from "../helpers/getFollowersFollowingsData";
import { User } from "../model/User";
import { getUserData } from "../redux/features/users/currentUserSlice";
import { Button } from "../sharedComponents/Button";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";
import { Icon } from "../sharedComponents/Icon";
import { Loading } from "../sharedComponents/Loading";

export const FollowingsFollowersPage = () => {
  let navigate = useNavigate();
  const location = useLocation();

  let userData = useSelector(getUserData);
  const [users, setUsers] = useState<[]>([]);

  const [activeTab, setActiveTab] = useState<string>(
    location.pathname === "/user/followers" ? "Followers" : "Followings"
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let users =
      activeTab === "Followers"
        ? getFollowersFollowingsData(userData.followers)
        : getFollowersFollowingsData(userData.followings);

    setTimeout(() => {
      setUsers(users);
      setLoading(false);
    }, 500);
  }, [activeTab, userData.followers, userData.followings]);

  const activeTabHandler = (event: React.MouseEvent<HTMLElement>) => {
    setUsers([]);
    if (event.currentTarget.innerText === "Followings") {
      setActiveTab(() => "Followings");
    } else {
      setActiveTab(() => "Followers");
    }
  };
  const refFollowingsBtn: any = useRef(null);
  const refFollowersBtn: any = useRef(null);
  return (
    <>
      <Header>
        <div className="flex-row-justify-start">
          <Button
            data_type="container"
            data_bg="transparent"
            clickHandler={() => navigate(-1)}
          >
            <Icon name="back" size="lg" />
          </Button>
        </div>
      </Header>
      <CardBody classname="flex-align-start">
        <div className="flex-row-justify-around">
          <Button
            data_type="container"
            data_bg={activeTab === "Followers" ? "google" : "primary"}
            clickHandler={activeTabHandler}
            reference={refFollowingsBtn}
          >
            <h4>Followings</h4>
          </Button>

          <Button
            data_type="container"
            data_bg={activeTab === "Followings" ? "google" : "primary"}
            clickHandler={activeTabHandler}
            reference={refFollowersBtn}
          >
            <h4>Followers</h4>
          </Button>
        </div>

        {loading ? <Loading /> : <UserList users={users} />}
      </CardBody>
    </>
  );
};
