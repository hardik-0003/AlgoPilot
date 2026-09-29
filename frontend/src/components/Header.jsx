import { useNavigate } from "react-router-dom";

import "../styles/header.css";

function Header() {
  const navigate = useNavigate();

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

        <h1>AlgoPilot</h1>

        <div className="header-right">

          {currentUser && (
            <>
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