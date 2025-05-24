import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requestsListFromStore = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const requestsList = await axios.get(
        BASE_URL + "user/requests/received",
        {
          withCredentials: true,
        }
      );
      console.log("requestsList", requestsList);
      dispatch(addRequests(requestsList?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, _id) => {
    const resp = await axios.post(
      BASE_URL + "request/review/" + status + "/" + _id,
      {},
      {
        withCredentials: true,
      }
    );
    console.log("id val", _id);
    dispatch(removeRequests(_id));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requestsListFromStore && requestsListFromStore.length === 0) {
    return <div>No requests found</div>;
  }

  console.log("requestsListFromStore", requestsListFromStore);

  //return <></>;

  return (
    <>
      <div className="">
        <div>
          <div className="flex justify-center  mb-4">
            <div className="text-3xl mt-10">Requests Received</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            {requestsListFromStore &&
              requestsListFromStore.map((user) => {
                const { firstname, lastname, profileUrl, age, gender, about } =
                  user.fromUserId;
                return (
                  <div className="flex flex-row bg-base-300 mt-4 w-2/5 align-items-center">
                    <div key={user.id} className="p-4 mx-w-1/5">
                      <img
                        className="rounded-full"
                        height="100"
                        width="100"
                        src={profileUrl}
                      ></img>
                    </div>
                    <div className="bg-base-300" key={user.id} m-auto>
                      <div>
                        <b>
                          {firstname} {lastname}
                        </b>
                      </div>
                      <div>
                        {age},{gender}
                      </div>
                      <div>{about}</div>
                    </div>
                    {/* <div className="flex flex-row justify-between"> */}
                    <div className="flex flex-row justify-between m-auto">
                      <button
                        onClick={() => reviewRequest("rejected", user._id)}
                        className="btn btn-secondary"
                      >
                        Rejected
                      </button>
                      <button
                        onClick={() => reviewRequest("accepted", user._id)}
                        className="btn btn-primary ml-4"
                      >
                        Interested
                      </button>
                      {/* <button className="btn btn-primary">Primary</button>
                    <button className="btn btn-secondary">Secondary</button> */}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;
