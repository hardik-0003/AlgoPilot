import "../styles/progress.css";

function ProgressStats({
  totalSolved,
  easySolved,
  mediumSolved,
  hardSolved,
  questions,
}) {
  const topicStats = {};

  questions.forEach((question) => {
    if (question.solved) {
      if (!topicStats[question.topic]) {
        topicStats[question.topic] = 0;
      }

      topicStats[question.topic]++;
    }
  });

  return (
    <section className="progress-section">
      <div className="progress-section-header">
        <h2>📊 Your Progress</h2>
        <p>Track your DSA progress by difficulty and topic.</p>
      </div>

      <div className="progress-stats-grid">
        <div className="progress-card">
          <h3>Total Solved</h3>
          <strong>{totalSolved}</strong>
        </div>

        <div className="progress-card">
          <h3>Easy</h3>
          <strong>{easySolved}</strong>
        </div>

        <div className="progress-card">
          <h3>Medium</h3>
          <strong>{mediumSolved}</strong>
        </div>

        <div className="progress-card">
          <h3>Hard</h3>
          <strong>{hardSolved}</strong>
        </div>
      </div>

      <div className="topics-progress">
        <h3>Topics Solved</h3>

        {Object.keys(topicStats).length === 0 ? (
          <p className="no-topic-progress">
            No topics solved yet.
          </p>
        ) : (
          <div className="topic-list">
            {Object.entries(topicStats).map(
              ([topic, count]) => (
                <div
                  className="topic-progress-item"
                  key={topic}
                >
                  <span>{topic}</span>
                  <strong>{count}</strong>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProgressStats;