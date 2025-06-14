import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsList = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const connectionsList = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      console.log("connectionsList", connectionsList);
      dispatch(addConnections(connectionsList?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connectionsList && connectionsList.length === 0) {
    return <div>No connections found</div>;
  }

  return (
    <>
      <div className="">
        <div>
          <div className="flex justify-center  mb-4">
            <div className="text-3xl mt-10">Connections</div>
          </div>
          <div className="flex flex-col items-center">
            {connectionsList &&
              connectionsList.map((user) => {
                return (
                  <div className="flex flex-row bg-base-300 mt-4 w-80">
                    <div key={user.id} className="p-4 mx-w-1/5">
                      <img
                        className="rounded-full"
                        height="100"
                        width="100"
                        src={user.profileUrl}
                      ></img>
                    </div>
                    <div className="bg-base-300" key={user.id}>
                      <div>
                        <b>
                          {user.firstname} {user.lastname}
                        </b>
                      </div>
                      <div>
                        {user.age},{user.gender}
                      </div>
                      <div>{user.about}</div>
                    </div>
                    <Link to={"/chat/" + user._id}>
                      <button
                        className="btn btn-secondary ml-4 mt-4 mr-2"
                        onClick={() => {
                          // Handle disconnect logic here
                          console.log("Disconnect clicked for", user._id);
                        }}
                      >
                        Chat
                      </button>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Connections;
