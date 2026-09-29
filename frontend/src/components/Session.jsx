import QuestionCard from "./QuestionCard";

function Session({
  sessionQuestions,
  sessionTotalQuestions,
  sessionNewCount,
  sessionRevisionCount,
  completedNewCount,
  completedRevisionCount,
  completeQuestion,
  endSession,
}) {
  const completedQuestions =
    completedNewCount +
    completedRevisionCount;

  const remainingQuestions =
    sessionQuestions.length;

  const progressPercentage =
    sessionTotalQuestions === 0
      ? 0
      : Math.round(
          (completedQuestions /
            sessionTotalQuestions) *
            100
        );

  return (
    <div className="session-page">

      {/* -------------------------------- */}
      {/* SESSION HEADER */}
      {/* -------------------------------- */}

      <div className="session-header">

        <div>
          <h2>
            🎯 Today's DSA Session
          </h2>

          <p>
            Keep going. Build consistency
            every day.
          </p>
        </div>

        <button
          className="end-session-btn"
          onClick={endSession}
        >
          Exit Session
        </button>

      </div>

      {/* -------------------------------- */}
      {/* PROGRESS */}
      {/* -------------------------------- */}

      <div className="session-progress">

        <div className="session-progress-top">

          <span>
            Progress
          </span>

          <strong>
            {completedQuestions} /{" "}
            {sessionTotalQuestions}
          </strong>

        </div>

        <div className="progress-bar">

          <div
            className="progress-bar-fill"
            style={{
              width: `${progressPercentage}%`,
            }}
          />

        </div>

        <p>
          {progressPercentage}% completed
        </p>

      </div>

      {/* -------------------------------- */}
      {/* SESSION SUMMARY */}
      {/* -------------------------------- */}

      <div className="session-summary">

        <div className="session-summary-card">

          <span>
            🎯 New Questions
          </span>

          <strong>
            {completedNewCount}/
            {sessionNewCount}
          </strong>

        </div>

        <div className="session-summary-card">

          <span>
            📖 Revisions
          </span>

          <strong>
            {completedRevisionCount}/
            {sessionRevisionCount}
          </strong>

        </div>

        <div className="session-summary-card">

          <span>
            ⏳ Remaining
          </span>

          <strong>
            {remainingQuestions}
          </strong>

        </div>

      </div>

      {/* -------------------------------- */}
      {/* SESSION COMPLETE */}
      {/* -------------------------------- */}

      {sessionQuestions.length === 0 ? (

        <div className="session-complete">

          <div className="session-complete-icon">
            🎉
          </div>

          <h2>
            Session Complete!
          </h2>

          <p>
            Amazing! You completed
            today's DSA mission.
          </p>

          <div className="completion-breakdown">

            <p>
              🎯 New Questions:{" "}
              <strong>
                {completedNewCount}/
                {sessionNewCount}
              </strong>
            </p>

            <p>
              📖 Revisions:{" "}
              <strong>
                {completedRevisionCount}/
                {sessionRevisionCount}
              </strong>
            </p>

          </div>

          <p>
            Consistency beats motivation.
            Keep it up!
          </p>

          <button
            className="complete-session-btn"
            onClick={endSession}
          >
            Back to Dashboard
          </button>

        </div>

      ) : (

        /* -------------------------------- */
        /* QUESTIONS */
        /* -------------------------------- */

        <div className="session-questions">

          <h3>
            Today's Questions
          </h3>

          {sessionQuestions.map(
            (question) => (

              <div
                className="session-question-wrapper"
                key={question.id}
              >

                <div className="question-type">

                  {question.sessionType ===
                  "revision" ? (

                    <span>
                      📖 REVISION
                    </span>

                  ) : (

                    <span>
                      🎯 NEW QUESTION
                    </span>

                  )}

                </div>

                <QuestionCard
                  question={question}
                  completeQuestion={
                    completeQuestion
                  }
                  sessionType={
                    question.sessionType
                  }
                />

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}

export default Session;