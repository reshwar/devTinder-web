import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ userData }) => {
  const dispatch = useDispatch();
  const reviewFromFeed = async (status, _id) => {
    try {
      const resp = await axios.post(
        BASE_URL + "sendConnectionRequest/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("id val", _id);
      dispatch(removeFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userData);
  if (!userData) {
    return <div className="flex justify-center mt-12">No users found</div>;
  }
  const { _id, firstname, lastname, profileUrl, age, gender, about } = userData;
  return (
    <div className="flex justify-center mt-12">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure class="w-96 h-64 overflow-hidden">
          <img src={profileUrl} class="w-96 h-64 object-cover" alt="Avatar" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{firstname + " " + lastname}</h2>
          <p>
            {age},{gender}
          </p>
          <p>{about}</p>
          <div className="card-actions gap-7 justify-center">
            <button
              className="btn btn-secondary"
              onClick={() => reviewFromFeed("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => reviewFromFeed("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
