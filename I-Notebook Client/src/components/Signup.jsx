import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ showAlert }) => {
  // instace of UseNavigate
  const navigate = useNavigate();
  // Holding user Data
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Handle Change
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/auth/createuser`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(url, userDetails, config)
      .then((res) => {
        // Setting token in local storage
        localStorage.setItem("token", res.data.token);
        // Redirecting to Home Page.
        navigate("/");
        showAlert("Successfully Logged-In", "success");
      })
      .catch((err) => showAlert(err.response.data.error, "danger"));

    setUserDetails({ name: "", email: "", password: "" });
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="border border-info-subtle p-5 rounded">
          <div className="mb-3 row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                id="name"
                name="name"
                required
                value={userDetails.name}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                required
                minLength={5}
                id="email"
                name="email"
                value={userDetails.email}
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
                onChange={handleChange}
                className="form-control"
                required
                minLength={8}
                id="password"
                name="password"
                value={userDetails.password}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn  mb-3 btn-outline-primary">
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
