import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import "../styles/header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "algoPilotCurrentUser"
      )
    );

  const handleLogout = () => {
    localStorage.removeItem(
      "algoPilotCurrentUser"
    );

    navigate("/login");
  };

  return (
    <header className="header">

      <div className="header-content">

        <button
          className="brand-btn"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          AlgoPilot
        </button>

        <div className="header-right">

          {currentUser && (
            <>

              <button
                className={`nav-btn ${
                  location.pathname ===
                  "/dashboard"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                Dashboard
              </button>

              <button
                className={`nav-btn ${
                  location.pathname ===
                  "/analytics"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  navigate("/analytics")
                }
              >
                Analytics
              </button>

              <span className="user-name">
                Hi, {currentUser.name}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </>
          )}

        </div>

      </div>

    </header>
  );
}

export default Header;