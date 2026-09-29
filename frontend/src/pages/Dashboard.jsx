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
import "../styles/session.css";

function Dashboard() {
  const [solveQuestions, setSolveQuestions] = useState(3);
  const [revisionQuestions, setRevisionQuestions] = useState(5);

  const [questions, setQuestions] = useState([]);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [pattern, setPattern] = useState("All");

  // Session state
  const [sessionQuestions, setSessionQuestions] =
    useState([]);

  const [sessionStarted, setSessionStarted] =
    useState(false);

  // ==========================
  // Revision Date Calculator
  // ==========================

  function getNextRevisionDate(revisionCount) {
    const date = new Date();

    let days;

    if (revisionCount === 0) {
      days = 3;
    } else if (revisionCount === 1) {
      days = 7;
    } else if (revisionCount === 2) {
      days = 14;
    } else {
      days = 30;
    }

    date.setDate(date.getDate() + days);

    return date.toISOString();
  }

  // ==========================
  // Load Questions
  // ==========================

  useEffect(() => {
    const savedQuestions =
      localStorage.getItem("algoPilotQuestions");

    if (savedQuestions) {
      const parsedQuestions = JSON.parse(savedQuestions);

      const updatedQuestions = parsedQuestions.map(
        (question) => ({
          ...question,

          solved: question.solved || false,

          attempts: question.attempts || 0,

          solvedAt: question.solvedAt || null,

          nextRevision:
            question.nextRevision || null,

          revisionCount:
            question.revisionCount || 0,
        })
      );

      setQuestions(updatedQuestions);
    } else {
      const initialQuestions = questionsData.map(
        (question) => ({
          ...question,

          solved: false,

          attempts: 0,

          solvedAt: null,

          nextRevision: null,

          revisionCount: 0,
        })
      );

      setQuestions(initialQuestions);
    }
  }, []);

  // ==========================
  // Save Questions
  // ==========================

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem(
        "algoPilotQuestions",
        JSON.stringify(questions)
      );
    }
  }, [questions]);

  // ==========================
  // Complete / Revise Question
  // ==========================

  function completeQuestion(id) {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question) => {
        if (question.id !== id) {
          return question;
        }

        const currentRevisionCount =
          question.revisionCount || 0;

        const isFirstSolve = !question.solved;

        const newRevisionCount = isFirstSolve
          ? 0
          : currentRevisionCount + 1;

        return {
          ...question,

          solved: true,

          attempts:
            (question.attempts || 0) + 1,

          solvedAt:
            new Date().toISOString(),

          revisionCount:
            newRevisionCount,

          nextRevision:
            getNextRevisionDate(
              newRevisionCount
            ),
        };
      })
    );
  }

  // ==========================
  // Start Session
  // ==========================

  function startSession() {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    // Find questions that are due for revision
    const dueRevisions = questions.filter(
      (question) => {
        if (!question.nextRevision) {
          return false;
        }

        const revisionDate = new Date(
          question.nextRevision
        );

        revisionDate.setHours(0, 0, 0, 0);

        return revisionDate <= today;
      }
    );

    // Find unsolved questions
    const unsolvedQuestions =
      questions.filter(
        (question) => !question.solved
      );

    // Select revision questions
    const selectedRevisions =
      dueRevisions.slice(
        0,
        revisionQuestions
      );

    // Select new questions
    const selectedNewQuestions =
      unsolvedQuestions
        .filter(
          (question) =>
            !selectedRevisions.some(
              (revision) =>
                revision.id === question.id
            )
        )
        .slice(0, solveQuestions);

    // Create today's session
    setSessionQuestions([
      ...selectedRevisions,
      ...selectedNewQuestions,
    ]);

    setSessionStarted(true);
  }

  // ==========================
  // End Session
  // ==========================

  function endSession() {
    setSessionStarted(false);
    setSessionQuestions([]);
  }

  // ==========================
  // Search & Filters
  // ==========================

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
          (company) =>
            company
              .toLowerCase()
              .includes(searchText)
        );

      const matchesDifficulty =
        difficulty === "All" ||
        question.difficulty === difficulty;

      const matchesTopic =
        topic === "All" ||
        question.topic === topic;

      const matchesPattern =
        pattern === "All" ||
        question.pattern === pattern;

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesTopic &&
        matchesPattern
      );
    });

  // ==========================
  // Statistics
  // ==========================

  const solvedCount =
    questions.filter(
      (question) => question.solved
    ).length;

  // ==========================
  // Revision Due
  // ==========================

  const revisionDueQuestions =
    questions.filter((question) => {
      if (!question.nextRevision) {
        return false;
      }

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const revisionDate = new Date(
        question.nextRevision
      );

      revisionDate.setHours(0, 0, 0, 0);

      return revisionDate <= today;
    });

  const revisionDueCount =
    revisionDueQuestions.length;

  // ==========================
  // UI
  // ==========================

  return (
    <div className="dashboard">

      <Header />

      {/* ==========================
          Hero
      ========================== */}

      <section className="hero">
        <h2>👋 Welcome Hardik</h2>

        <p>
          Master DSA. Never Forget.
        </p>
      </section>

      {/* ==========================
          Stats
      ========================== */}

      <div className="stats">

        <StatsCard
          title="Questions Solved"
          value={solvedCount}
        />

        <StatsCard
          title="Revision Due"
          value={revisionDueCount}
        />

        <StatsCard
          title="Current Streak"
          value="0"
        />

      </div>

      {/* ==========================
          Today's Mission
      ========================== */}

      <MissionCard
        solveQuestions={solveQuestions}
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

      {/* ==========================
          Session
      ========================== */}

      {sessionStarted && (
        <Session
          sessionQuestions={
            sessionQuestions
          }
          completeQuestion={
            completeQuestion
          }
          endSession={endSession}
        />
      )}

      {/* ==========================
          Progress
      ========================== */}

      <ProgressStats
        questions={questions}
      />

      {/* ==========================
          Revision Due Today
      ========================== */}

      <div className="revision-section">

        <h2>
          📖 Revision Due Today
        </h2>

        {revisionDueCount === 0 ? (
          <p>
            No questions are due for
            revision today 🎉
          </p>
        ) : (
          revisionDueQuestions.map(
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

      {/* ==========================
          Question Bank
      ========================== */}

      <div className="question-search">

        <h2>
          Question Bank
        </h2>

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search questions, topics, patterns, companies..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Filters */}

        <div className="filters">

          {/* Difficulty */}

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
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

          {/* Topic */}

          <select
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
            }
          >
            <option value="All">
              All Topics
            </option>

            <option value="Array">
              Array
            </option>

            <option value="String">
              String
            </option>

            <option value="Stack">
              Stack
            </option>

            <option value="Binary Search">
              Binary Search
            </option>

            <option value="Linked List">
              Linked List
            </option>

            <option value="Tree">
              Tree
            </option>

            <option value="Graph">
              Graph
            </option>

            <option value="Dynamic Programming">
              Dynamic Programming
            </option>

            <option value="Backtracking">
              Backtracking
            </option>
          </select>

          {/* Pattern */}

          <select
            value={pattern}
            onChange={(e) =>
              setPattern(e.target.value)
            }
          >
            <option value="All">
              All Patterns
            </option>

            <option value="HashMap">
              HashMap
            </option>

            <option value="HashSet">
              HashSet
            </option>

            <option value="Greedy">
              Greedy
            </option>

            <option value="Stack">
              Stack
            </option>

            <option value="Kadane's Algorithm">
              Kadane's Algorithm
            </option>

            <option value="Sliding Window">
              Sliding Window
            </option>

            <option value="Binary Search">
              Binary Search
            </option>

            <option value="Modified Binary Search">
              Modified Binary Search
            </option>

            <option value="Two Pointers">
              Two Pointers
            </option>

            <option value="DFS">
              DFS
            </option>

            <option value="BFS">
              BFS
            </option>

            <option value="1D DP">
              1D DP
            </option>

            <option value="Backtracking">
              Backtracking
            </option>

          </select>

        </div>

      </div>

      {/* ==========================
          Questions List
      ========================== */}

      <div className="questions-list">

        <h2>
          Questions ({filteredQuestions.length})
        </h2>

        {filteredQuestions.length === 0 ? (
          <p>
            No questions found.
          </p>
        ) : (
          filteredQuestions.map(
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
  );
}

export default Dashboard;