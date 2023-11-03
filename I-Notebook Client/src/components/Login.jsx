import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ showAlert }) => {
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: String(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/auth/Login`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(url, userDetail, config)
      .then((res) => {
        if (res.data.success) {
          // Setting token in local storage
          localStorage.setItem("token", res.data.token);
          // Redirecting to Home Page.
          navigate("/");
          showAlert("Successfully Logged-In", "success");
        }
      })
      .catch((err) => showAlert(err.response.data.error, "danger"));

    setUserDetail({ email: "", password: "" });
  };
  return (
    <>
      <div className="container-sm  my-5">
        <form className="container-lg " onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                onChange={changeHandler}
                value={userDetail.email}
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                required
                name="password"
                onChange={changeHandler}
                value={userDetail.password}
                className="form-control"
                id="inputPassword"
              />
            </div>
          </div>
          <div className=" d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-primary mb-3">
              LogIn
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        <h2>Preview Data</h2>
        <p>
          <span>Email:</span> trial1@gmail.com
        </p>
        <p>
          <span>Password:</span> 12345678
        </p>
      </div>
    </>
  );
};

export default Login;
