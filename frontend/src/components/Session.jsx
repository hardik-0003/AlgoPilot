import QuestionCard from "./QuestionCard";

function Session({
  sessionQuestions,
  completeQuestion,
  endSession,
}) {
  return (
    <div className="session-page">

      <div className="session-header">
        <h2>🎯 Today's DSA Session</h2>

        <button
          className="end-session-btn"
          onClick={endSession}
        >
          End Session
        </button>
      </div>

      <p>
        Questions for today's session:{" "}
        <strong>{sessionQuestions.length}</strong>
      </p>

      {sessionQuestions.length === 0 ? (
        <div className="session-complete">
          <h2>🎉 Session Complete!</h2>

          <p>
            You have completed today's mission.
          </p>
        </div>
      ) : (
        <div className="session-questions">
          {sessionQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              completeQuestion={completeQuestion}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Session;