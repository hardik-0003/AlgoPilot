function ProgressStats({ questions }) {
  const solvedQuestions = questions.filter(
    (question) => question.solved
  );

  const easyCount = solvedQuestions.filter(
    (question) => question.difficulty === "Easy"
  ).length;

  const mediumCount = solvedQuestions.filter(
    (question) => question.difficulty === "Medium"
  ).length;

  const hardCount = solvedQuestions.filter(
    (question) => question.difficulty === "Hard"
  ).length;

  const topicCount = {};

  solvedQuestions.forEach((question) => {
    topicCount[question.topic] =
      (topicCount[question.topic] || 0) + 1;
  });

  return (
    <div className="progress-section">

      <h2>📊 Your Progress</h2>

      <div className="progress-grid">

        <div className="progress-card">
          <h3>Total Solved</h3>
          <h1>{solvedQuestions.length}</h1>
        </div>

        <div className="progress-card">
          <h3>Easy</h3>
          <h1>{easyCount}</h1>
        </div>

        <div className="progress-card">
          <h3>Medium</h3>
          <h1>{mediumCount}</h1>
        </div>

        <div className="progress-card">
          <h3>Hard</h3>
          <h1>{hardCount}</h1>
        </div>

      </div>

      <div className="topic-progress">

        <h3>Topics Solved</h3>

        {Object.keys(topicCount).length === 0 ? (
          <p>No questions solved yet.</p>
        ) : (
          Object.entries(topicCount).map(
            ([topic, count]) => (
              <div
                className="topic-row"
                key={topic}
              >
                <span>{topic}</span>

                <strong>{count}</strong>
              </div>
            )
          )
        )}

      </div>

    </div>
  );
}

export default ProgressStats;