import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feedDataFromStore = useSelector((store) => store.feed);
  console.log("feedDataFromStore ", feedDataFromStore);

  const fetchFeed = async () => {
    try {
      const feedData = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feedData?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <>{feedDataFromStore && <UserCard userData={feedDataFromStore[0]} />}</>
  );
};

export default Feed;
