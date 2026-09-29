import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import "../styles/questionDetails.css";

function QuestionDetails() {
  const { id } = useParams();

  const [question, setQuestion] =
    useState(null);

  useEffect(() => {
    const savedQuestions =
      localStorage.getItem(
        "algoPilotQuestions"
      );

    if (!savedQuestions) {
      return;
    }

    const questions =
      JSON.parse(savedQuestions);

    const foundQuestion =
      questions.find(
        (item) =>
          String(item.id) ===
          String(id)
      );

    setQuestion(foundQuestion);
  }, [id]);

  if (!question) {
    return (
      <div className="question-details-page">

        <div className="details-not-found">

          <h2>
            Question Not Found
          </h2>

          <p>
            This question does not exist
            in your question bank.
          </p>

          <Link
            to="/dashboard"
            className="back-btn"
          >
            ← Back to Dashboard
          </Link>

        </div>

      </div>
    );
  }

  const revisionCount =
    question.revisionCount || 0;

  const attempts =
    question.attempts || 0;

  return (
    <div className="question-details-page">

      {/* HEADER */}

      <div className="details-header">

        <Link
          to="/dashboard"
          className="back-link"
        >
          ← Back to Dashboard
        </Link>

        <a
          href={question.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="leetcode-btn"
        >
          Open on LeetCode →
        </a>

      </div>

      {/* QUESTION HEADER */}

      <div className="details-main-card">

        <div className="question-title-section">

          <h1>
            {question.title}
          </h1>

          <div className="question-badges">

            <span>
              {question.difficulty}
            </span>

            <span>
              {question.topic}
            </span>

            <span>
              {question.pattern}
            </span>

          </div>

        </div>

        {/* STATUS */}

        <div className="status-box">

          <span>
            Status
          </span>

          <strong
            className={
              question.solved
                ? "status-solved"
                : "status-unsolved"
            }
          >
            {question.solved
              ? "✓ Solved"
              : "○ Unsolved"}
          </strong>

        </div>

      </div>

      {/* PROGRESS */}

      <div className="details-section">

        <h2>
          📊 Progress
        </h2>

        <div className="details-grid">

          <div className="detail-stat">

            <span>
              Attempts
            </span>

            <strong>
              {attempts}
            </strong>

          </div>

          <div className="detail-stat">

            <span>
              Revision Count
            </span>

            <strong>
              {revisionCount}
            </strong>

          </div>

          <div className="detail-stat">

            <span>
              Solved At
            </span>

            <strong>
              {question.solvedAt
                ? new Date(
                    question.solvedAt
                  ).toLocaleDateString()
                : "Not solved"}
            </strong>

          </div>

          <div className="detail-stat">

            <span>
              Next Revision
            </span>

            <strong>
              {question.nextRevision
                ? new Date(
                    question.nextRevision
                  ).toLocaleDateString()
                : "Not scheduled"}
            </strong>

          </div>

        </div>

      </div>

      {/* REVISION INFO */}

      <div className="details-section">

        <h2>
          📖 Revision Status
        </h2>

        {!question.solved ? (

          <div className="info-box">

            <strong>
              This question has not been
              solved yet.
            </strong>

            <p>
              Solve it first and AlgoPilot
              will automatically schedule
              the first revision.
            </p>

          </div>

        ) : (

          <div className="revision-info">

            <div>

              <span>
                Current Revision
              </span>

              <strong>
                {revisionCount}
              </strong>

            </div>

            <div>

              <span>
                Next Revision
              </span>

              <strong>
                {question.nextRevision
                  ? new Date(
                      question.nextRevision
                    ).toLocaleDateString()
                  : "Not scheduled"}
              </strong>

            </div>

          </div>

        )}

      </div>

      {/* COMPANIES */}

      <div className="details-section">

        <h2>
          🏢 Companies
        </h2>

        <div className="company-list">

          {question.companies.map(
            (company) => (
              <span
                key={company}
                className="company-badge"
              >
                {company}
              </span>
            )
          )}

        </div>

      </div>

      {/* IMPORTANCE */}

      <div className="details-section">

        <h2>
          ⭐ Importance
        </h2>

        <p className="importance-text">
          {question.importance}
        </p>

      </div>

    </div>
  );
}

export default QuestionDetails;