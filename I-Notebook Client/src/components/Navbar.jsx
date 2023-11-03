import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  // Learn about useLocation
  // Creating an instance of useLoction
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            I-Notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              {localStorage.getItem("token") ? (
                <Link
                  className="btn btn-outline-primary mx-2"
                  to="/login"
                  role="button"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-outline-primary"
                    to="/signup"
                    role="button"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
