import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [emailId, setEmailId] = useState("em123@gmail.com");
  const [password, setPassword] = useState("Eshwar@123");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
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
      dispatch(addUser(loginResponse.data));
      navigate("/");
    } catch (error) {
      setLoginError(error?.response.data);
    }
  };

  const SignUpHandler = async () => {
    try {
      const signUpResponse = await axios.post(
        BASE_URL + "signUp",
        {
          firstname,
          lastname,
          age,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(signUpResponse.data));
      navigate("/profile");
    } catch (error) {
      setLoginError(error?.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-8 py-4">
        <div className="card w-96 bg-base-300 card-lg shadow-sm ">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLogin ? "Login" : "SignUp"}
            </h2>
            {!isLogin && (
              <>
                <input
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="Firstname"
                  className="input input-primary mt-5"
                />
                <input
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Lastname"
                  className="input input-primary mt-5"
                />
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="text"
                  placeholder="Age"
                  className="input input-primary mt-5"
                />
              </>
            )}
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
            {loginError && <p className="text-error">{loginError}</p>}

            <div className=" card-actions mt-3 justify-center">
              <button
                onClick={isLogin ? LoginHandler : SignUpHandler}
                className="btn btn-primary"
              >
                {isLogin ? "Submit" : "SignUp"}
              </button>
            </div>
            <p
              className="text-center mt-3 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Click here to SignUp" : "Clcik here to Login"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
