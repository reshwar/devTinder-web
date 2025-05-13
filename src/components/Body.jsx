import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    console.log("calledddddd");
    try {
      const userProfile = await axios.post(
        BASE_URL + "profile/view",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(userProfile));
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    console.log("called usee effect");
    fetchUser();
  }, []);
  console.log("called");
  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Body;
