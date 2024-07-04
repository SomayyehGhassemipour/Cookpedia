import { getUserDataByID } from "../sevices/user/UserService";
import MESSAGES from "../data/message.json";

export const getFollowersFollowingsData = (data: any) => {
  const fetchUserData = async (id: any) => {
    try {
      const userData = await getUserDataByID(id as string);
      return {
        avatar: userData?.avatar,
        userName: userData?.userName,
        fullname: userData?.fullname,
        userID: userData?.userID,
      };
    } catch (error) {
      console.log(MESSAGES.FETCH_USER_INFO_ERORR);
    }
  };

  let users: any = [];
  data.map((user: any) => {
    fetchUserData(user.userID).then((response) => {
      users.push(response);
    });
  });
  return users;
};
