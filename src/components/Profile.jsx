import { useEffect } from "react";
import ProfileEdit from "./ProfileEdit";
import { Navigate } from "react-router-dom";

const Profile = () => {
  // const fetchUser = async () => {
  //   console.log("calledddddd");
  //   try {
  //     const userProfile = await axios.post(
  //       BASE_URL + "profile/view",
  //       {},
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     dispatch(addUser(userProfile));
  //   } catch (error) {
  //     Navigate("/login");
  //   }
  // };
  // useEffect(() => {
  //   console.log("called usee effect");
  //   fetchUser();
  // }, []);
  return (
    <>
      <ProfileEdit />
    </>
  );
};

export default Profile;
