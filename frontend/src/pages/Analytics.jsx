import { useMemo } from "react";
import Header from "../components/Header";
import "../styles/analytics.css";

function Analytics() {
  const currentUser = JSON.parse(
    localStorage.getItem("algoPilotCurrentUser")
  );

  const userQuestionsKey = currentUser
    ? `algoPilotQuestions_${currentUser.id}`
    : null;

  const questions = useMemo(() => {
    if (!userQuestionsKey) return [];

    try {
      return JSON.parse(
        localStorage.getItem(userQuestionsKey) || "[]"
      );
    } catch {
      return [];
    }
  }, [userQuestionsKey]);

  const totalQuestions = questions.length;
  const solvedQuestions = questions.filter((q) => q.solved).length;
  const unsolvedQuestions = totalQuestions - solvedQuestions;

  const progressPercentage = totalQuestions
    ? Math.round((solvedQuestions / totalQuestions) * 100)
    : 0;

  const difficultyStats = ["Easy", "Medium", "Hard"].map(
    (difficulty) => {
      const total = questions.filter(
        (q) => q.difficulty === difficulty
      ).length;

      const solved = questions.filter(
        (q) =>
          q.difficulty === difficulty &&
          q.solved
      ).length;

      return {
        difficulty,
        total,
        solved,
        percentage: total
          ? Math.round((solved / total) * 100)
          : 0,
      };
    }
  );

  const topicStats = useMemo(() => {
    const topicMap = {};

    questions.forEach((question) => {
      if (!topicMap[question.topic]) {
        topicMap[question.topic] = {
          total: 0,
          solved: 0,
        };
      }

      topicMap[question.topic].total += 1;

      if (question.solved) {
        topicMap[question.topic].solved += 1;
      }
    });

    return Object.entries(topicMap)
      .map(([topic, stats]) => ({
        topic,
        ...stats,
        percentage: stats.total
          ? Math.round(
              (stats.solved / stats.total) * 100
            )
          : 0,
      }))
      .sort((a, b) => b.solved - a.solved);
  }, [questions]);

  const revisionDue = questions.filter(
    (question) => {
      if (
        !question.solved ||
        !question.nextRevision
      ) {
        return false;
      }

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const revisionDate = new Date(
        question.nextRevision
      );

      revisionDate.setHours(0, 0, 0, 0);

      return revisionDate <= today;
    }
  ).length;

  const totalRevisions = questions.reduce(
    (total, question) =>
      total + (question.revisionCount || 0),
    0
  );

  const questionsWithRevisions =
    questions.filter(
      (question) =>
        (question.revisionCount || 0) > 0
    ).length;

  const revisionCoverage = solvedQuestions
    ? Math.round(
        (questionsWithRevisions /
          solvedQuestions) *
          100
      )
    : 0;

  const recentActivity = useMemo(() => {
    const activities = [];

    questions.forEach((question) => {
      (
        question.revisionHistory || []
      ).forEach((history) => {
        activities.push({
          id: `${question.id}-${history.date}-${history.type}`,
          title: question.title,
          type: history.type,
          revisionNumber:
            history.revisionNumber,
          date: history.date,
        });
      });
    });

    return activities
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
      .slice(0, 8);
  }, [questions]);

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div>
      <Header />

      <main className="analytics-page">

        <div className="analytics-title">

          <div>
            <h2>📊 Analytics</h2>

            <p>
              Understand your DSA progress
              and consistency.
            </p>
          </div>

        </div>

        {/* OVERVIEW */}

        <section className="analytics-overview-grid">

          <div className="analytics-stat-card">
            <span>Total Questions</span>

            <strong>
              {totalQuestions}
            </strong>

            <small>
              Your complete question bank
            </small>
          </div>

          <div className="analytics-stat-card">
            <span>Solved</span>

            <strong>
              {solvedQuestions}
            </strong>

            <small>
              {unsolvedQuestions}
              {" "}
              questions remaining
            </small>
          </div>

          <div className="analytics-stat-card">
            <span>Overall Progress</span>

            <strong>
              {progressPercentage}%
            </strong>

            <small>
              {solvedQuestions} of{" "}
              {totalQuestions} solved
            </small>
          </div>

          <div className="analytics-stat-card">
            <span>Revision Due</span>

            <strong>
              {revisionDue}
            </strong>

            <small>
              Questions ready for revision
            </small>
          </div>

        </section>

        {/* DIFFICULTY */}

        <section className="analytics-section">

          <div className="analytics-section-header">

            <h3>
              🎯 Difficulty Breakdown
            </h3>

            <p>
              See how much of each difficulty
              level you have completed.
            </p>

          </div>

          <div className="difficulty-grid">

            {difficultyStats.map(
              (item) => (
                <div
                  className="difficulty-card"
                  key={item.difficulty}
                >

                  <div className="analytics-card-topline">

                    <strong>
                      {item.difficulty}
                    </strong>

                    <span>
                      {item.solved}/
                      {item.total}
                    </span>

                  </div>

                  <div className="analytics-progress-track">

                    <div
                      className="analytics-progress-fill"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />

                  </div>

                  <p>
                    {item.percentage}%
                    {" "}
                    completed
                  </p>

                </div>
              )
            )}

          </div>

        </section>

        {/* TOPICS */}

        <section className="analytics-section">

          <div className="analytics-section-header">

            <h3>
              📚 Topic Progress
            </h3>

            <p>
              Track solved questions across
              your DSA topics.
            </p>

          </div>

          {topicStats.length === 0 ? (

            <div className="analytics-empty">
              No topic data available yet.
            </div>

          ) : (

            <div className="topic-analytics-list">

              {topicStats.map(
                (item) => (
                  <div
                    className="topic-analytics-card"
                    key={item.topic}
                  >

                    <div className="analytics-card-topline">

                      <strong>
                        {item.topic}
                      </strong>

                      <span>
                        {item.solved}/
                        {item.total}
                      </span>

                    </div>

                    <div className="analytics-progress-track">

                      <div
                        className="analytics-progress-fill"
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />

                    </div>

                    <p>
                      {item.percentage}%
                      {" "}
                      completed
                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </section>

        {/* REVISION ANALYTICS */}

        <section className="analytics-section">

          <div className="analytics-section-header">

            <h3>
              🔄 Revision Analytics
            </h3>

            <p>
              Measure how consistently you
              are revising solved questions.
            </p>

          </div>

          <div className="revision-analytics-grid">

            <div className="revision-analytics-card">
              <span>Total Revisions</span>

              <strong>
                {totalRevisions}
              </strong>

              <small>
                Completed revision cycles
              </small>
            </div>

            <div className="revision-analytics-card">
              <span>Questions Revised</span>

              <strong>
                {questionsWithRevisions}
              </strong>

              <small>
                Unique solved questions
                revised
              </small>
            </div>

            <div className="revision-analytics-card">
              <span>Revision Coverage</span>

              <strong>
                {revisionCoverage}%
              </strong>

              <small>
                Of solved questions revised
                at least once
              </small>
            </div>

            <div className="revision-analytics-card">
              <span>Due Now</span>

              <strong>
                {revisionDue}
              </strong>

              <small>
                Need your attention
              </small>
            </div>

          </div>

        </section>

        {/* RECENT ACTIVITY */}

        <section className="analytics-section">

          <div className="analytics-section-header">

            <h3>
              🕒 Recent Activity
            </h3>

            <p>
              Your latest solves and
              revision activity.
            </p>

          </div>

          {recentActivity.length === 0 ? (

            <div className="analytics-empty">
              No activity yet. Start solving
              questions to build your history.
            </div>

          ) : (

            <div className="activity-list">

              {recentActivity.map(
                (activity) => (
                  <div
                    className="activity-item"
                    key={activity.id}
                  >

                    <div className="activity-icon">
                      {activity.type ===
                      "revision"
                        ? "🔄"
                        : "🎯"}
                    </div>

                    <div className="activity-content">

                      <strong>
                        {activity.title}
                      </strong>

                      <span>
                        {activity.type ===
                        "revision"
                          ? `Revision #${activity.revisionNumber}`
                          : "Question solved"}
                      </span>

                    </div>

                    <time>
                      {formatDate(
                        activity.date
                      )}
                    </time>

                  </div>
                )
              )}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default Analytics;