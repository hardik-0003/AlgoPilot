import { useState, useEffect } from "react";

import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import MissionCard from "../components/MissionCard";
import QuestionCard from "../components/QuestionCard";
import ProgressStats from "../components/ProgressStats";
import Session from "../components/Session";

import questionsData from "../data/questions";

import "../styles/card.css";
import "../styles/mission.css";
import "../styles/progress.css";
import "../styles/Session.css";

function Dashboard() {
  const [solveQuestions, setSolveQuestions] = useState(3);
  const [revisionQuestions, setRevisionQuestions] =
    useState(5);

  const [questions, setQuestions] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [pattern, setPattern] = useState("All");
  const [company, setCompany] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [sessionQuestions, setSessionQuestions] =
    useState([]);

  const [sessionTotalQuestions, setSessionTotalQuestions] =
    useState(0);

  const [sessionNewCount, setSessionNewCount] =
    useState(0);

  const [sessionRevisionCount, setSessionRevisionCount] =
    useState(0);

  const [completedNewCount, setCompletedNewCount] =
    useState(0);

  const [
    completedRevisionCount,
    setCompletedRevisionCount,
  ] = useState(0);

  const [sessionStarted, setSessionStarted] =
    useState(false);

  // ---------------------------------------
  // NEXT REVISION DATE
  // ---------------------------------------

  function getNextRevisionDate(revisionCount) {
    const date = new Date();

    if (revisionCount === 0) {
      date.setDate(date.getDate() + 3);
    } else if (revisionCount === 1) {
      date.setDate(date.getDate() + 7);
    } else if (revisionCount === 2) {
      date.setDate(date.getDate() + 14);
    } else {
      date.setDate(date.getDate() + 30);
    }

    return date.toISOString();
  }

  // ---------------------------------------
  // LOAD QUESTIONS
  // ---------------------------------------

  useEffect(() => {
    const savedQuestions =
      localStorage.getItem(
        "algoPilotQuestions"
      );

    if (savedQuestions) {
      setQuestions(
        JSON.parse(savedQuestions)
      );
    } else {
      const initialQuestions =
        questionsData.map((question) => ({
          ...question,
          solved: false,
          attempts: 0,
          solvedAt: null,
          revisionCount: 0,
          nextRevision: null,
        }));

      setQuestions(initialQuestions);
    }
  }, []);

  // ---------------------------------------
  // SAVE QUESTIONS
  // ---------------------------------------

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem(
        "algoPilotQuestions",
        JSON.stringify(questions)
      );
    }
  }, [questions]);

  // ---------------------------------------
  // CHECK REVISION DUE
  // ---------------------------------------

  function isRevisionDue(question) {
    if (!question.solved) {
      return false;
    }

    if (!question.nextRevision) {
      return false;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const revisionDate =
      new Date(question.nextRevision);

    revisionDate.setHours(0, 0, 0, 0);

    return revisionDate <= today;
  }

  // ---------------------------------------
  // COMPLETE QUESTION
  // ---------------------------------------

  function completeQuestion(
    id,
    sessionType = "new"
  ) {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question) => {
        if (question.id !== id) {
          return question;
        }

        // NEW QUESTION
        if (sessionType === "new") {
          const revisionCount =
            question.revisionCount || 0;

          return {
            ...question,

            solved: true,

            attempts:
              (question.attempts || 0) + 1,

            solvedAt:
              new Date().toISOString(),

            revisionCount,

            nextRevision:
              getNextRevisionDate(
                revisionCount
              ),
          };
        }

        // REVISION
        const currentRevisionCount =
          question.revisionCount || 0;

        const newRevisionCount =
          currentRevisionCount + 1;

        return {
          ...question,

          solved: true,

          attempts:
            (question.attempts || 0) + 1,

          revisionCount:
            newRevisionCount,

          nextRevision:
            getNextRevisionDate(
              newRevisionCount
            ),
        };
      })
    );

    if (sessionType === "revision") {
      setCompletedRevisionCount(
        (count) => count + 1
      );
    } else {
      setCompletedNewCount(
        (count) => count + 1
      );
    }

    setSessionQuestions(
      (currentSession) =>
        currentSession.filter(
          (question) =>
            question.id !== id
        )
    );
  }

  // ---------------------------------------
  // START SESSION
  // ---------------------------------------

  function startSession() {
    const dueRevisionQuestions =
      questions.filter(isRevisionDue);

    const selectedRevisionQuestions =
      dueRevisionQuestions
        .slice(0, revisionQuestions)
        .map((question) => ({
          ...question,
          sessionType: "revision",
        }));

    const unsolvedQuestions =
      questions.filter(
        (question) => !question.solved
      );

    const selectedNewQuestions =
      unsolvedQuestions
        .filter(
          (question) =>
            !selectedRevisionQuestions.some(
              (revisionQuestion) =>
                revisionQuestion.id ===
                question.id
            )
        )
        .slice(0, solveQuestions)
        .map((question) => ({
          ...question,
          sessionType: "new",
        }));

    const newSession = [
      ...selectedRevisionQuestions,
      ...selectedNewQuestions,
    ];

    setSessionQuestions(newSession);

    setSessionTotalQuestions(
      newSession.length
    );

    setSessionNewCount(
      selectedNewQuestions.length
    );

    setSessionRevisionCount(
      selectedRevisionQuestions.length
    );

    setCompletedNewCount(0);
    setCompletedRevisionCount(0);

    setSessionStarted(true);
  }

  // ---------------------------------------
  // END SESSION
  // ---------------------------------------

  function endSession() {
    setSessionStarted(false);

    setSessionQuestions([]);

    setSessionTotalQuestions(0);

    setSessionNewCount(0);

    setSessionRevisionCount(0);

    setCompletedNewCount(0);

    setCompletedRevisionCount(0);
  }

  // ---------------------------------------
  // FILTER VALUES
  // ---------------------------------------

  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Uber",
    "Adobe",
    "Bloomberg",
  ];

  const topics = [
    ...new Set(
      questions.map(
        (question) => question.topic
      )
    ),
  ];

  const patterns = [
    ...new Set(
      questions.map(
        (question) => question.pattern
      )
    ),
  ];

  // ---------------------------------------
  // FILTER QUESTIONS
  // ---------------------------------------

  const filteredQuestions =
    questions.filter((question) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        question.title
          .toLowerCase()
          .includes(searchText) ||
        question.topic
          .toLowerCase()
          .includes(searchText) ||
        question.pattern
          .toLowerCase()
          .includes(searchText) ||
        question.companies.some(
          (companyName) =>
            companyName
              .toLowerCase()
              .includes(searchText)
        );

      const matchesStatus =
        status === "All" ||
        (status === "Solved" &&
          question.solved) ||
        (status === "Unsolved" &&
          !question.solved) ||
        (status === "Revision Due" &&
          isRevisionDue(question));

      const matchesDifficulty =
        difficulty === "All" ||
        question.difficulty ===
          difficulty;

      const matchesTopic =
        topic === "All" ||
        question.topic === topic;

      const matchesPattern =
        pattern === "All" ||
        question.pattern === pattern;

      const matchesCompany =
        company === "All" ||
        question.companies.includes(
          company
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDifficulty &&
        matchesTopic &&
        matchesPattern &&
        matchesCompany
      );
    });

  // ---------------------------------------
  // SORT QUESTIONS
  // ---------------------------------------

  const difficultyOrder = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  };

  const importanceOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const sortedQuestions = [
    ...filteredQuestions,
  ].sort((a, b) => {
    if (sortBy === "difficulty") {
      return (
        difficultyOrder[a.difficulty] -
        difficultyOrder[b.difficulty]
      );
    }

    if (sortBy === "importance") {
      return (
        importanceOrder[a.importance] -
        importanceOrder[b.importance]
      );
    }

    return 0;
  });

  // ---------------------------------------
  // DASHBOARD STATS
  // ---------------------------------------

  const solvedCount =
    questions.filter(
      (question) => question.solved
    ).length;

  const revisionDueQuestions =
    questions.filter(isRevisionDue);

  // ---------------------------------------
  // UI
  // ---------------------------------------

  return (
    <div>
      <Header />

      {!sessionStarted && (
        <>
          {/* TOP STATS */}

          <div className="stats-container">

            <StatsCard
              title="Total Questions"
              value={questions.length}
            />

            <StatsCard
              title="Solved"
              value={solvedCount}
            />

            <StatsCard
              title="Revision Due"
              value={
                revisionDueQuestions.length
              }
            />

            <StatsCard
              title="Remaining"
              value={
                questions.length -
                solvedCount
              }
            />

          </div>

          {/* TODAY'S MISSION */}

          <MissionCard
            solveQuestions={
              solveQuestions
            }
            setSolveQuestions={
              setSolveQuestions
            }
            revisionQuestions={
              revisionQuestions
            }
            setRevisionQuestions={
              setRevisionQuestions
            }
            startSession={startSession}
          />
        </>
      )}

      {/* SESSION */}

      {sessionStarted && (
        <Session
          sessionQuestions={
            sessionQuestions
          }
          sessionTotalQuestions={
            sessionTotalQuestions
          }
          sessionNewCount={
            sessionNewCount
          }
          sessionRevisionCount={
            sessionRevisionCount
          }
          completedNewCount={
            completedNewCount
          }
          completedRevisionCount={
            completedRevisionCount
          }
          completeQuestion={
            completeQuestion
          }
          endSession={endSession}
        />
      )}

      {!sessionStarted && (
        <>
          {/* PROGRESS */}

          <ProgressStats
            questions={questions}
          />

          {/* REVISION DUE */}

          <div className="question-section">

            <h2>
              📖 Revision Due
            </h2>

            {revisionDueQuestions.length ===
            0 ? (
              <p>
                No revisions due today 🎉
              </p>
            ) : (
              <div className="question-list">

                {revisionDueQuestions.map(
                  (question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      completeQuestion={
                        completeQuestion
                      }
                    />
                  )
                )}

              </div>
            )}

          </div>

          {/* QUESTION BANK */}

          <div className="question-section">

            <h2>
              📚 Question Bank
            </h2>

            {/* SEARCH */}

            <input
              type="text"
              className="search-input"
              placeholder="Search questions..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

            {/* FILTERS */}

            <div className="filters">

              {/* STATUS */}

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Questions
                </option>

                <option value="Solved">
                  Solved
                </option>

                <option value="Unsolved">
                  Unsolved
                </option>

                <option value="Revision Due">
                  Revision Due
                </option>
              </select>

              {/* DIFFICULTY */}

              <select
                value={difficulty}
                onChange={(event) =>
                  setDifficulty(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Difficulties
                </option>

                <option value="Easy">
                  Easy
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Hard">
                  Hard
                </option>
              </select>

              {/* TOPIC */}

              <select
                value={topic}
                onChange={(event) =>
                  setTopic(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Topics
                </option>

                {topics.map(
                  (topicName) => (
                    <option
                      key={topicName}
                      value={topicName}
                    >
                      {topicName}
                    </option>
                  )
                )}

              </select>

              {/* PATTERN */}

              <select
                value={pattern}
                onChange={(event) =>
                  setPattern(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Patterns
                </option>

                {patterns.map(
                  (patternName) => (
                    <option
                      key={patternName}
                      value={patternName}
                    >
                      {patternName}
                    </option>
                  )
                )}

              </select>

              {/* COMPANY */}

              <select
                value={company}
                onChange={(event) =>
                  setCompany(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Companies
                </option>

                {companies.map(
                  (companyName) => (
                    <option
                      key={companyName}
                      value={companyName}
                    >
                      {companyName}
                    </option>
                  )
                )}

              </select>

              {/* SORT */}

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
              >
                <option value="default">
                  Sort: Default
                </option>

                <option value="difficulty">
                  Difficulty: Easy → Hard
                </option>

                <option value="importance">
                  Importance: High → Low
                </option>

              </select>

            </div>

            {/* RESULTS COUNT */}

            <p className="results-count">
              Showing{" "}
              <strong>
                {sortedQuestions.length}
              </strong>{" "}
              of{" "}
              <strong>
                {questions.length}
              </strong>{" "}
              questions
            </p>

            {/* QUESTIONS */}

            <div className="question-list">

              {sortedQuestions.length ===
              0 ? (
                <p>
                  No questions found.
                </p>
              ) : (
                sortedQuestions.map(
                  (question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      completeQuestion={
                        completeQuestion
                      }
                    />
                  )
                )
              )}

            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;