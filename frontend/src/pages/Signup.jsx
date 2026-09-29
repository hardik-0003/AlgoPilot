import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    if (!password) {
      return {
        label: "",
        className: "",
      };
    }

    if (password.length < 6) {
      return {
        label: "Weak",
        className: "weak",
      };
    }

    const hasNumber =
      /\d/.test(password);

    const hasSpecial =
      /[!@#$%^&*]/.test(password);

    if (
      password.length >= 8 &&
      hasNumber &&
      hasSpecial
    ) {
      return {
        label: "Strong",
        className: "strong",
      };
    }

    return {
      label: "Medium",
      className: "medium",
    };
  };

  const passwordStrength =
    getPasswordStrength();

  const handleSignup = (e) => {
    e.preventDefault();

    setError("");

    const trimmedName =
      name.trim();

    const trimmedEmail =
      email.trim().toLowerCase();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please fill in all fields."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    const savedUsers =
      JSON.parse(
        localStorage.getItem(
          "algoPilotUsers"
        )
      ) || [];

    const existingUser =
      savedUsers.find(
        (user) =>
          user.email ===
          trimmedEmail
      );

    if (existingUser) {
      setError(
        "An account with this email already exists."
      );
      return;
    }

    const newUser = {
      id: Date.now().toString(),

      name: trimmedName,

      email: trimmedEmail,

      password: password,

      /*
       * This is a brand-new account.
       * Do NOT migrate the old global
       * question data to it.
       */

      dataInitialized: true,
    };

    const updatedUsers = [
      ...savedUsers,
      newUser,
    ];

    localStorage.setItem(
      "algoPilotUsers",
      JSON.stringify(updatedUsers)
    );

    /*
     * New user gets their own question
     * storage key.
     *
     * Dashboard will seed the 25 questions
     * when this key doesn't exist.
     */

    const userQuestionsKey =
      `algoPilotQuestions_${newUser.id}`;

    localStorage.removeItem(
      userQuestionsKey
    );

    /*
     * Login user automatically.
     */

    localStorage.setItem(
      "algoPilotCurrentUser",
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
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
              ✨ Start your journey
            </span>

            <h2>
              Build consistency.
              <br />
              <span>
                Crack your interviews.
              </span>
            </h2>

            <p>
              AlgoPilot helps you organize
              your DSA preparation with daily
              practice and spaced revision.
            </p>

            <div className="auth-features">

              <div className="auth-feature">

                <span>🔥</span>

                <div>
                  <strong>
                    Practice Daily
                  </strong>

                  <small>
                    Make solving questions a habit.
                  </small>
                </div>

              </div>

              <div className="auth-feature">

                <span>🧠</span>

                <div>
                  <strong>
                    Revise Smart
                  </strong>

                  <small>
                    Revisit questions at the right time.
                  </small>
                </div>

              </div>

              <div className="auth-feature">

                <span>🚀</span>

                <div>
                  <strong>
                    Prepare Better
                  </strong>

                  <small>
                    Turn preparation into measurable progress.
                  </small>
                </div>

              </div>

            </div>

          </div>

          <div className="auth-info-footer">
            Your interview preparation starts here.
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
              Create your account 🚀
            </h1>

            <p>
              Start building your DSA consistency.
            </p>

          </div>

          <form
            className="auth-form"
            onSubmit={handleSignup}
          >

            {/* NAME */}

            <div className="form-group">

              <label htmlFor="name">
                Your name
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>

            {/* EMAIL */}

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

            {/* PASSWORD */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

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
                  placeholder="Minimum 6 characters"
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

              {password && (
                <div className="password-strength">

                  <div className="strength-bar">

                    <div
                      className={`strength-fill ${passwordStrength.className}`}
                    />

                  </div>

                  <span
                    className={
                      passwordStrength.className
                    }
                  >
                    {passwordStrength.label}
                  </span>

                </div>
              )}

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔐
                </span>

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(
                      e.target.value
                    );
                    setError("");
                  }}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

              {confirmPassword &&
                password ===
                  confirmPassword && (
                  <div className="password-match">
                    ✓ Passwords match
                  </div>
                )}

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
                Create My Account
              </span>

              <span className="button-arrow">
                →
              </span>
            </button>

          </form>

          <div className="auth-divider">
            <span>
              Already have an account?
            </span>
          </div>

          <Link
            to="/login"
            className="secondary-auth-button"
          >
            Back to Login
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

export default Signup;