import QuestionCard from "./QuestionCard";

import "../styles/Session.css";

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

  const progressPercentage =
    sessionTotalQuestions === 0
      ? 0
      : Math.round(
          (completedQuestions /
            sessionTotalQuestions) *
            100
        );

  const remainingQuestions =
    sessionQuestions.length;

  return (
    <div className="session-page">

      {/* HEADER */}

      <div className="session-header">

        <div className="session-header-content">
          <h2>
            🎯 Today's DSA Session
          </h2>

          <p>
            Keep going. Build consistency every day.
          </p>
        </div>

        <button
          className="end-session-btn"
          onClick={endSession}
        >
          Exit Session
        </button>

      </div>

      {/* PROGRESS */}

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

      {/* SESSION SUMMARY */}

      <div className="session-summary">

        <div className="session-summary-card">

          <div className="summary-icon">
            🎯
          </div>

          <div className="summary-content">

            <span>
              New Questions
            </span>

            <strong>
              {completedNewCount} /{" "}
              {sessionNewCount}
            </strong>

          </div>

        </div>

        <div className="session-summary-card">

          <div className="summary-icon">
            📖
          </div>

          <div className="summary-content">

            <span>
              Revisions
            </span>

            <strong>
              {completedRevisionCount} /{" "}
              {sessionRevisionCount}
            </strong>

          </div>

        </div>

        <div className="session-summary-card">

          <div className="summary-icon">
            ⏳
          </div>

          <div className="summary-content">

            <span>
              Remaining
            </span>

            <strong>
              {remainingQuestions}
            </strong>

          </div>

        </div>

      </div>

      {/* SESSION COMPLETE */}

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

        <div className="session-questions">

          <div className="session-questions-header">

            <div>
              <h3>
                Today's Questions
              </h3>

              <p>
                Complete each question to finish
                your practice session.
              </p>
            </div>

            <span className="questions-count">
              {sessionQuestions.length} remaining
            </span>

          </div>

          <div className="session-question-grid">

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

        </div>

      )}

    </div>
  );
}

export default Session;