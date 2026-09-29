import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const trimmedEmail =
      email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    const savedUsers =
      JSON.parse(
        localStorage.getItem("algoPilotUsers")
      ) || [];

    const user = savedUsers.find(
      (savedUser) =>
        savedUser.email === trimmedEmail &&
        savedUser.password === password
    );

    if (!user) {
      setError(
        "Invalid email or password."
      );
      return;
    }

    /*
     * ---------------------------------------
     * USER-SPECIFIC QUESTION DATA
     * ---------------------------------------
     */

    const userQuestionsKey =
      `algoPilotQuestions_${user.id}`;

    const existingUserQuestions =
      localStorage.getItem(
        userQuestionsKey
      );

    /*
     * ---------------------------------------
     * MIGRATE OLD GLOBAL DATA
     *
     * Earlier AlgoPilot stored all questions
     * under:
     *
     * algoPilotQuestions
     *
     * If this is an older account and it does
     * not yet have user-specific data, move
     * that old data to this user's account.
     * ---------------------------------------
     */

    if (
      !existingUserQuestions &&
      !user.dataInitialized
    ) {
      const oldGlobalQuestions =
        localStorage.getItem(
          "algoPilotQuestions"
        );

      if (oldGlobalQuestions) {
        localStorage.setItem(
          userQuestionsKey,
          oldGlobalQuestions
        );
      }
    }

    /*
     * Mark this user's question data as
     * initialized.
     */

    const updatedUsers =
      savedUsers.map((savedUser) =>
        savedUser.id === user.id
          ? {
              ...savedUser,
              dataInitialized: true,
            }
          : savedUser
      );

    localStorage.setItem(
      "algoPilotUsers",
      JSON.stringify(updatedUsers)
    );

    /*
     * ---------------------------------------
     * SAVE CURRENT USER
     * ---------------------------------------
     */

    localStorage.setItem(
      "algoPilotCurrentUser",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-info">

          <div className="auth-brand">
            <div className="brand-icon">
              ⚡
            </div>

            <span>AlgoPilot</span>
          </div>

          <div className="auth-info-content">

            <span className="auth-badge">
              🚀 Your DSA companion
            </span>

            <h2>
              Master DSA.
              <br />
              <span>
                One question at a time.
              </span>
            </h2>

            <p>
              Track your progress, revise at
              the right time, and stay consistent
              throughout your interview preparation.
            </p>

            <div className="auth-features">

              <div className="auth-feature">
                <span>🎯</span>

                <div>
                  <strong>
                    Daily Missions
                  </strong>

                  <small>
                    Build a consistent solving habit.
                  </small>
                </div>
              </div>

              <div className="auth-feature">
                <span>📖</span>

                <div>
                  <strong>
                    Smart Revision
                  </strong>

                  <small>
                    Never forget what you learned.
                  </small>
                </div>
              </div>

              <div className="auth-feature">
                <span>📊</span>

                <div>
                  <strong>
                    Track Progress
                  </strong>

                  <small>
                    See your DSA journey clearly.
                  </small>
                </div>
              </div>

            </div>

          </div>

          <div className="auth-info-footer">
            Built for consistent interview preparation.
          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="auth-card">

          <div className="mobile-brand">
            <div className="brand-icon">
              ⚡
            </div>

            <span>AlgoPilot</span>
          </div>

          <div className="auth-heading">

            <h1>
              Welcome back 👋
            </h1>

            <p>
              Continue your DSA journey.
            </p>

          </div>

          <form
            className="auth-form"
            onSubmit={handleLogin}
          >

            <div className="form-group">

              <label htmlFor="email">
                Email address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉️
                </span>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>

            <div className="form-group">

              <div className="label-row">

                <label htmlFor="password">
                  Password
                </label>

                <span className="password-hint">
                  Keep it secure
                </span>

              </div>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>

            {error && (
              <div className="auth-error">
                <span>⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-button"
            >
              <span>
                Login to AlgoPilot
              </span>

              <span className="button-arrow">
                →
              </span>
            </button>

          </form>

          <div className="auth-divider">
            <span>
              New to AlgoPilot?
            </span>
          </div>

          <Link
            to="/signup"
            className="secondary-auth-button"
          >
            Create your free account
          </Link>

          <div className="auth-trust">
            <span>🔐</span>

            <span>
              Your account data is kept
              separate in this prototype.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;