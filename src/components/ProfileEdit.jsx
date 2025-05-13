import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ProfileEdit = () => {
  const user = useSelector((store) => store.user);
  console.log("user from store", user);
  //const { firstname, lastname, profileUrl, age, gender, about } = user;
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [profileUrl, setProfileUrl] = useState(user?.profileUrl);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [email, setEmail] = useState(user?.about);
  const [showToast, setShowToast] = useState(null);
  const userData = { firstname, lastname, profileUrl, age, gender, about };

  const handleUpdate = async () => {
    try {
      await axios.patch(BASE_URL + "profile/edit", userData, {
        withCredentials: true,
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(null);
      }, 1000);
    } catch (error) {
      console.log("Error updating profile", error);
    }
  };

  return (
    <>
      {user != null && (
        <div className="flex flex-row justify-center my-8 py-4">
          <div className="card w-96 bg-base-300 card-lg shadow-sm ">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <label className="label">First Name</label>
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                className="input"
              />
              <label className="label">Last Name</label>
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                className="input"
              />
              <label className="label">Photo Url</label>
              <input
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                type="text"
                className="input"
              />
              <label className="label">Age</label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="text"
                className="input"
              />
              <label className="label">Gender</label>
              <input
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                type="text"
                className="input"
              />
              <label className="label">About</label>
              <input
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                type="text"
                className="input"
              />

              {/* {loginError && <p className="text-error">{loginError}</p>} */}
              <div className=" card-actions mt-3 justify-center">
                <button onClick={handleUpdate} className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="ml-10">
            <UserCard userData={userData} />
            {/* <UserCard {...userData} /> */}
          </div>
          {showToast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>Profile Updated</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default ProfileEdit;
