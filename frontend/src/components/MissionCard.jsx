import "../styles/mission.css";

function MissionCard({
  solveQuestions,
  setSolveQuestions,
  revisionQuestions,
  setRevisionQuestions,
  startSession,
}) {
  return (
    <section className="mission-card">
      <div className="mission-header">
        <div>
          <h2>🎯 Today's Mission</h2>
          <p>
            Complete your daily DSA targets and stay consistent.
          </p>
        </div>
      </div>

      <div className="mission-controls">
        <div className="mission-control">
          <span className="mission-icon">🎯</span>

          <div className="mission-control-content">
            <h3>New Questions</h3>
            <p>Practice new problems today.</p>
          </div>

          <div className="counter">
            <button
              onClick={() =>
                setSolveQuestions(
                  Math.max(0, solveQuestions - 1)
                )
              }
            >
              −
            </button>

            <span>{solveQuestions}</span>

            <button
              onClick={() =>
                setSolveQuestions(
                  Math.min(20, solveQuestions + 1)
                )
              }
            >
              +
            </button>
          </div>
        </div>

        <div className="mission-control">
          <span className="mission-icon">📖</span>

          <div className="mission-control-content">
            <h3>Revision Questions</h3>
            <p>Revise questions that are due.</p>
          </div>

          <div className="counter">
            <button
              onClick={() =>
                setRevisionQuestions(
                  Math.max(0, revisionQuestions - 1)
                )
              }
            >
              −
            </button>

            <span>{revisionQuestions}</span>

            <button
              onClick={() =>
                setRevisionQuestions(
                  Math.min(20, revisionQuestions + 1)
                )
              }
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        className="start-session-btn"
        onClick={startSession}
      >
        🚀 Start Today's Session
      </button>
    </section>
  );
}

export default MissionCard;