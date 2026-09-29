import { useMemo, useState } from "react";

import "../styles/practice.css";

function PracticePanel({
  questions,
  startPractice,
}) {
  const [selectedPattern, setSelectedPattern] =
    useState("");

  const [selectedDifficulty, setSelectedDifficulty] =
    useState("Easy");

  const [questionCount, setQuestionCount] =
    useState(3);

  const patterns = useMemo(() => {
    const uniquePatterns = new Map();

    questions.forEach((question) => {
      if (
        question.patternId &&
        question.pattern
      ) {
        uniquePatterns.set(
          question.patternId,
          question.pattern
        );
      }
    });

    return Array.from(
      uniquePatterns.entries()
    ).map(([id, name]) => ({
      id,
      name,
    }));
  }, [questions]);

  const availableQuestions =
    selectedPattern === ""
      ? []
      : questions.filter(
          (question) =>
            question.patternId ===
              selectedPattern &&
            question.difficulty ===
              selectedDifficulty &&
            !question.solved
        );

  const handleStartPractice = () => {
    if (!selectedPattern) {
      return;
    }

    if (availableQuestions.length === 0) {
      return;
    }

    const count = Math.min(
      Number(questionCount),
      availableQuestions.length
    );

    const shuffledQuestions = [
      ...availableQuestions,
    ].sort(() => Math.random() - 0.5);

    startPractice(
      shuffledQuestions.slice(0, count)
    );
  };

  return (
    <section className="practice-panel">
      <div className="practice-panel-header">
        <div>
          <span className="practice-eyebrow">
            🎯 PRACTICE MODE
          </span>

          <h2>
            Practice by Pattern
          </h2>

          <p>
            Choose a DSA pattern and build
            your understanding from Easy →
            Medium → Hard.
          </p>
        </div>
      </div>

      <div className="practice-form">

        <div className="practice-field">
          <label>
            Pattern
          </label>

          <select
            value={selectedPattern}
            onChange={(e) =>
              setSelectedPattern(
                e.target.value
              )
            }
          >
            <option value="">
              Select a pattern
            </option>

            {patterns.map(
              (pattern) => (
                <option
                  key={pattern.id}
                  value={pattern.id}
                >
                  {pattern.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="practice-field">
          <label>
            Difficulty
          </label>

          <select
            value={selectedDifficulty}
            onChange={(e) =>
              setSelectedDifficulty(
                e.target.value
              )
            }
          >
            <option value="Easy">
              Easy — Foundation
            </option>

            <option value="Medium">
              Medium — Intermediate
            </option>

            <option value="Hard">
              Hard — Advanced
            </option>
          </select>
        </div>

        <div className="practice-field">
          <label>
            Questions
          </label>

          <select
            value={questionCount}
            onChange={(e) =>
              setQuestionCount(
                Number(e.target.value)
              )
            }
          >
            <option value={1}>
              1 Question
            </option>

            <option value={3}>
              3 Questions
            </option>

            <option value={5}>
              5 Questions
            </option>

            <option value={10}>
              10 Questions
            </option>
          </select>
        </div>

        <button
          className="practice-start-button"
          onClick={
            handleStartPractice
          }
          disabled={
            !selectedPattern ||
            availableQuestions.length === 0
          }
        >
          Start Practice →
        </button>

      </div>

      {selectedPattern && (
        <div className="practice-info">

          <div>
            <strong>
              {availableQuestions.length}
            </strong>

            <span>
              unsolved questions available
            </span>
          </div>

          <div>
            <strong>
              {selectedDifficulty}
            </strong>

            <span>
              current level
            </span>
          </div>

        </div>
      )}

      {selectedPattern &&
        availableQuestions.length === 0 && (
          <div className="practice-empty">
            🎉 No unsolved questions are
            available for this pattern and
            difficulty.
          </div>
        )}

    </section>
  );
}

export default PracticePanel;