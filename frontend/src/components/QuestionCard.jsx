function QuestionCard({
  question,
  completeQuestion,
}) {
  return (
    <div className="question-card">

      <h3>
        {question.title}
      </h3>

      <p>
        <strong>Difficulty:</strong>{" "}
        {question.difficulty}
      </p>

      <p>
        <strong>Topic:</strong>{" "}
        {question.topic}
      </p>

      <p>
        <strong>Pattern:</strong>{" "}
        {question.pattern}
      </p>

      <p>
        <strong>Companies:</strong>{" "}
        {question.companies.join(", ")}
      </p>

      <p>
        <strong>Importance:</strong>{" "}
        {question.importance}
      </p>

      <p>
        <strong>Attempts:</strong>{" "}
        {question.attempts || 0}
      </p>

      {question.solved && (
        <>
          <p>
            <strong>Status:</strong>{" "}
            ✓ Solved
          </p>

          <p>
            <strong>Revision Count:</strong>{" "}
            {question.revisionCount || 0}
          </p>

          <p>
            <strong>Solved At:</strong>{" "}
            {question.solvedAt
              ? new Date(
                  question.solvedAt
                ).toLocaleDateString()
              : "Not available"}
          </p>

          <p>
            <strong>Next Revision:</strong>{" "}
            {question.nextRevision
              ? new Date(
                  question.nextRevision
                ).toLocaleDateString()
              : "Not scheduled"}
          </p>
        </>
      )}

      <div className="question-actions">

        <a
          href={question.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open on LeetCode →
        </a>

        <button
          onClick={() =>
            completeQuestion(
              question.id
            )
          }
        >
          {question.solved
            ? "✓ Complete Revision"
            : "Mark as Solved"}
        </button>

      </div>

    </div>
  );
}

export default QuestionCard;