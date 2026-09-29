function MissionCard({
  solveQuestions,
  setSolveQuestions,
  revisionQuestions,
  setRevisionQuestions,
  startSession,
}) {
  return (
    <div className="mission-card">

      <h2>Today's Mission</h2>

      <div className="mission-item">

        <span>
          🎯 Solve Questions
        </span>

        <div className="counter">

          <button
            onClick={() => {
              if (solveQuestions > 0) {
                setSolveQuestions(
                  solveQuestions - 1
                );
              }
            }}
          >
            -
          </button>

          <span>
            {solveQuestions}
          </span>

          <button
            onClick={() => {
              if (solveQuestions < 20) {
                setSolveQuestions(
                  solveQuestions + 1
                );
              }
            }}
          >
            +
          </button>

        </div>

      </div>

      <div className="mission-item">

        <span>
          📖 Revise Questions
        </span>

        <div className="counter">

          <button
            onClick={() => {
              if (revisionQuestions > 0) {
                setRevisionQuestions(
                  revisionQuestions - 1
                );
              }
            }}
          >
            -
          </button>

          <span>
            {revisionQuestions}
          </span>

          <button
            onClick={() => {
              if (revisionQuestions < 20) {
                setRevisionQuestions(
                  revisionQuestions + 1
                );
              }
            }}
          >
            +
          </button>

        </div>

      </div>

      <button
        className="start-btn"
        onClick={startSession}
      >
        Start Session
      </button>

    </div>
  );
}

export default MissionCard;