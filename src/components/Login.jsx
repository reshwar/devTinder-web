import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("el123@gmail.com");
  const [password, setPassword] = useState("Eshwar@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoginHandler = async () => {
    try {
      const loginResponse = await axios.post(
        BASE_URL + "login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(loginResponse.data);
      dispatch(addUser(loginResponse.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center my-8 py-4">
        <div className="card w-96 bg-base-300 card-lg shadow-sm ">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <input
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              type="text"
              placeholder="Email"
              className="input input-primary mt-5"
            />
            <label className="input input-primary mt-2">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
              />
            </label>
            <div className=" card-actions mt-3 justify-center">
              <button onClick={LoginHandler} className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
