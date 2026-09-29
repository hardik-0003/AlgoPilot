import { useEffect, useState } from "react";

import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import MissionCard from "../components/MissionCard";
import QuestionCard from "../components/QuestionCard";
import ProgressStats from "../components/ProgressStats";
import Session from "../components/Session";
import PracticePanel from "../components/PracticePanel";

import initialQuestions from "../data/questions";

import "../styles/dashboard.css";

function Dashboard() {
  const [solveQuestions, setSolveQuestions] =
    useState(3);

  const [revisionQuestions, setRevisionQuestions] =
    useState(5);

  const [questions, setQuestions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [difficulty, setDifficulty] =
    useState("All");

  const [topic, setTopic] =
    useState("All");

  const [pattern, setPattern] =
    useState("All");

  const [company, setCompany] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");

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

  const [completedRevisionCount, setCompletedRevisionCount] =
    useState(0);

  const [sessionStarted, setSessionStarted] =
    useState(false);

  /*
   * ---------------------------------------
   * CURRENT USER
   * ---------------------------------------
   */

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "algoPilotCurrentUser"
      )
    );

  const userQuestionsKey =
    currentUser
      ? `algoPilotQuestions_${currentUser.id}`
      : null;

  /*
   * ---------------------------------------
   * REVISION DATE LOGIC
   * ---------------------------------------
   */

  const getNextRevisionDate = (
    revisionCount
  ) => {
    const today = new Date();

    let daysToAdd = 3;

    if (revisionCount === 1) {
      daysToAdd = 7;
    } else if (revisionCount === 2) {
      daysToAdd = 14;
    } else if (revisionCount >= 3) {
      daysToAdd = 30;
    }

    today.setDate(
      today.getDate() + daysToAdd
    );

    return today.toISOString();
  };

  /*
   * ---------------------------------------
   * CHECK REVISION DUE
   * ---------------------------------------
   */

  const isRevisionDue = (
    question
  ) => {
    if (
      !question.solved ||
      !question.nextRevision
    ) {
      return false;
    }

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const revisionDate =
      new Date(
        question.nextRevision
      );

    revisionDate.setHours(
      0,
      0,
      0,
      0
    );

    return revisionDate <= today;
  };

  /*
   * ---------------------------------------
   * LOAD USER QUESTIONS
   * ---------------------------------------
   */

  useEffect(() => {
    if (!userQuestionsKey) {
      return;
    }

    const savedQuestions =
      localStorage.getItem(
        userQuestionsKey
      );

    if (savedQuestions) {
      const parsedQuestions =
        JSON.parse(
          savedQuestions
        );

      const existingById =
        new Map(
          parsedQuestions.map(
            (question) => [
              question.id,
              question,
            ]
          )
        );

      const builtInIds =
        new Set(
          initialQuestions.map(
            (question) =>
              question.id
          )
        );

      const mergedQuestions =
        initialQuestions.map(
          (question) => {
            const existing =
              existingById.get(
                question.id
              );

            if (!existing) {
              return {
                ...question,
                solved: false,
                attempts: 0,
                solvedAt: null,
                revisionCount: 0,
                nextRevision: null,
                revisionHistory: [],
              };
            }

            return {
              ...question,
              ...existing,

              title: question.title,
              difficulty: question.difficulty,
              topic: question.topic,
              pattern: question.pattern,
              patternId: question.patternId,
              concept: question.concept,
              stage: question.stage,
              importance: question.importance,
              companies: question.companies,
              learningOrder:
                question.learningOrder,
              leetcodeUrl:
                question.leetcodeUrl,

              revisionHistory:
                existing.revisionHistory ||
                (existing.solvedAt
                  ? [
                      {
                        type: "solve",
                        date:
                          existing.solvedAt,
                      },
                    ]
                  : []),
            };
          }
        );

      const customQuestions =
        parsedQuestions.filter(
          (question) =>
            !builtInIds.has(
              question.id
            )
        );

      setQuestions([
        ...mergedQuestions,
        ...customQuestions,
      ]);
    } else {
      const preparedQuestions =
        initialQuestions.map(
          (question) => ({
            ...question,

            solved: false,

            attempts: 0,

            solvedAt: null,

            revisionCount: 0,

            nextRevision: null,

            revisionHistory: [],
          })
        );

      setQuestions(
        preparedQuestions
      );

      localStorage.setItem(
        userQuestionsKey,
        JSON.stringify(
          preparedQuestions
        )
      );
    }
  }, [userQuestionsKey]);

  /*
   * ---------------------------------------
   * SAVE USER QUESTIONS
   * ---------------------------------------
   */

  useEffect(() => {
    if (
      questions.length > 0 &&
      userQuestionsKey
    ) {
      localStorage.setItem(
        userQuestionsKey,
        JSON.stringify(
          questions
        )
      );
    }
  }, [
    questions,
    userQuestionsKey,
  ]);

  /*
   * ---------------------------------------
   * COMPLETE QUESTION
   * ---------------------------------------
   */

  const completeQuestion = (
    id,
    sessionType = "new"
  ) => {
    setQuestions(
      (prevQuestions) =>
        prevQuestions.map(
          (question) => {
            if (
              question.id !== id
            ) {
              return question;
            }

            const currentHistory =
              question.revisionHistory ||
              [];

            const currentRevisionCount =
              question.revisionCount ||
              0;

            const currentAttempts =
              question.attempts ||
              0;

            /*
             * NEW QUESTION
             */

            if (
              sessionType === "new"
            ) {
              const solvedDate =
                new Date().toISOString();

              return {
                ...question,

                solved: true,

                attempts:
                  currentAttempts +
                  1,

                solvedAt:
                  solvedDate,

                revisionCount:
                  currentRevisionCount,

                nextRevision:
                  getNextRevisionDate(
                    currentRevisionCount
                  ),

                revisionHistory: [
                  ...currentHistory,

                  {
                    type: "solve",
                    date: solvedDate,
                  },
                ],
              };
            }

            /*
             * REVISION
             */

            const newRevisionCount =
              currentRevisionCount +
              1;

            const revisionDate =
              new Date().toISOString();

            return {
              ...question,

              solved: true,

              attempts:
                currentAttempts +
                1,

              revisionCount:
                newRevisionCount,

              nextRevision:
                getNextRevisionDate(
                  newRevisionCount
                ),

              revisionHistory: [
                ...currentHistory,

                {
                  type: "revision",

                  revisionNumber:
                    newRevisionCount,

                  date: revisionDate,
                },
              ],
            };
          }
        )
    );

    if (
      sessionType === "revision"
    ) {
      setCompletedRevisionCount(
        (prev) => prev + 1
      );
    } else {
      setCompletedNewCount(
        (prev) => prev + 1
      );
    }

    setSessionQuestions(
      (prev) =>
        prev.filter(
          (question) =>
            question.id !== id
        )
    );
  };

  /*
   * ---------------------------------------
   * DIFFICULTY WEIGHT
   * ---------------------------------------
   */

  const getDifficultyWeight = (
    difficulty
  ) => {
    if (
      difficulty === "Easy"
    ) {
      return 1;
    }

    if (
      difficulty === "Medium"
    ) {
      return 2;
    }

    if (
      difficulty === "Hard"
    ) {
      return 3;
    }

    return 0;
  };

  /*
   * ---------------------------------------
   * IMPORTANCE WEIGHT
   * ---------------------------------------
   */

  const getImportanceWeight = (
    importance
  ) => {
    if (
      importance === "High"
    ) {
      return 3;
    }

    if (
      importance === "Medium"
    ) {
      return 2;
    }

    if (
      importance === "Low"
    ) {
      return 1;
    }

    return 0;
  };

  /*
   * ---------------------------------------
   * START SMART DAILY SESSION
   * ---------------------------------------
   */

  const startSession = () => {
    const dueRevisions =
      questions
        .filter(
          (question) =>
            isRevisionDue(
              question
            )
        )
        .sort(
          (a, b) => {
            const dateA =
              new Date(
                a.nextRevision
              ).getTime();

            const dateB =
              new Date(
                b.nextRevision
              ).getTime();

            return dateA - dateB;
          }
        );

    const selectedRevisions =
      dueRevisions
        .slice(
          0,
          revisionQuestions
        )
        .map(
          (question) => ({
            ...question,
            sessionType:
              "revision",
          })
        );

    const unsolvedQuestions =
      questions
        .filter(
          (question) =>
            !question.solved
        )
        .sort(
          (a, b) => {
            const importanceA =
              getImportanceWeight(
                a.importance
              );

            const importanceB =
              getImportanceWeight(
                b.importance
              );

            if (
              importanceA !==
              importanceB
            ) {
              return (
                importanceB -
                importanceA
              );
            }

            const difficultyA =
              getDifficultyWeight(
                a.difficulty
              );

            const difficultyB =
              getDifficultyWeight(
                b.difficulty
              );

            return (
              difficultyA -
              difficultyB
            );
          }
        );

    const selectedNewQuestions =
      unsolvedQuestions
        .slice(
          0,
          solveQuestions
        )
        .map(
          (question) => ({
            ...question,
            sessionType: "new",
          })
        );

    const newSession = [
      ...selectedRevisions,
      ...selectedNewQuestions,
    ];

    setSessionQuestions(
      newSession
    );

    setSessionTotalQuestions(
      newSession.length
    );

    setSessionNewCount(
      selectedNewQuestions.length
    );

    setSessionRevisionCount(
      selectedRevisions.length
    );

    setCompletedNewCount(0);

    setCompletedRevisionCount(
      0
    );

    setSessionStarted(true);
  };

  /*
   * ---------------------------------------
   * START PATTERN PRACTICE
   * ---------------------------------------
   */

  const startPractice = (
    selectedQuestions
  ) => {
    if (
      !selectedQuestions ||
      selectedQuestions.length === 0
    ) {
      return;
    }

    const practiceSession =
      selectedQuestions.map(
        (question) => ({
          ...question,
          sessionType: "new",
        })
      );

    setSessionQuestions(
      practiceSession
    );

    setSessionTotalQuestions(
      practiceSession.length
    );

    setSessionNewCount(
      practiceSession.length
    );

    setSessionRevisionCount(
      0
    );

    setCompletedNewCount(0);

    setCompletedRevisionCount(
      0
    );

    setSessionStarted(true);
  };

  /*
   * ---------------------------------------
   * END SESSION
   * ---------------------------------------
   */

  const endSession = () => {
    setSessionQuestions([]);

    setSessionTotalQuestions(0);

    setSessionNewCount(0);

    setSessionRevisionCount(0);

    setCompletedNewCount(0);

    setCompletedRevisionCount(0);

    setSessionStarted(false);
  };

  /*
   * ---------------------------------------
   * FILTER OPTIONS
   * ---------------------------------------
   */

  const topics = [
    "All",
    ...new Set(
      questions.map(
        (question) =>
          question.topic
      )
    ),
  ];

  const patterns = [
    "All",
    ...new Set(
      questions.map(
        (question) =>
          question.pattern
      )
    ),
  ];

  const companies = [
    "All",
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Uber",
    "Adobe",
    "Bloomberg",
  ];

  /*
   * ---------------------------------------
   * FILTER QUESTIONS
   * ---------------------------------------
   */

  const filteredQuestions =
    questions
      .filter(
        (question) => {
          const matchesSearch =
            question.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesStatus =
            status === "All" ||
            (status ===
              "Solved" &&
              question.solved) ||
            (status ===
              "Unsolved" &&
              !question.solved) ||
            (status ===
              "Revision Due" &&
              isRevisionDue(
                question
              ));

          const matchesDifficulty =
            difficulty ===
              "All" ||
            question.difficulty ===
              difficulty;

          const matchesTopic =
            topic === "All" ||
            question.topic ===
              topic;

          const matchesPattern =
            pattern === "All" ||
            question.pattern ===
              pattern;

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
        }
      )
      .sort(
        (a, b) => {
          if (
            sortBy ===
            "difficulty"
          ) {
            return (
              getDifficultyWeight(
                a.difficulty
              ) -
              getDifficultyWeight(
                b.difficulty
              )
            );
          }

          if (
            sortBy ===
            "importance"
          ) {
            return (
              getImportanceWeight(
                b.importance
              ) -
              getImportanceWeight(
                a.importance
              )
            );
          }

          return (
            a.learningOrder -
            b.learningOrder
          );
        }
      );

  /*
   * ---------------------------------------
   * STATS
   * ---------------------------------------
   */

  const totalQuestions =
    questions.length;

  const solvedQuestions =
    questions.filter(
      (question) =>
        question.solved
    ).length;

  const revisionDueCount =
    questions.filter(
      (question) =>
        isRevisionDue(
          question
        )
    ).length;

  const easySolved =
    questions.filter(
      (question) =>
        question.solved &&
        question.difficulty ===
          "Easy"
    ).length;

  const mediumSolved =
    questions.filter(
      (question) =>
        question.solved &&
        question.difficulty ===
          "Medium"
    ).length;

  const hardSolved =
    questions.filter(
      (question) =>
        question.solved &&
        question.difficulty ===
          "Hard"
    ).length;

  /*
   * ---------------------------------------
   * SESSION PAGE
   * ---------------------------------------
   */

  if (sessionStarted) {
    return (
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
        endSession={
          endSession
        }
      />
    );
  }

  /*
   * ---------------------------------------
   * DASHBOARD
   * ---------------------------------------
   */

  return (
    <div>

      <Header />

      <main className="dashboard">

        <div className="dashboard-title">

          <h2>
            Dashboard
          </h2>

          <p>
            Track your DSA progress and
            build consistency.
          </p>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <StatsCard
            title="Total Questions"
            value={
              totalQuestions
            }
          />

          <StatsCard
            title="Solved"
            value={
              solvedQuestions
            }
          />

          <StatsCard
            title="Revision Due"
            value={
              revisionDueCount
            }
          />

          <StatsCard
            title="Progress"
            value={
              totalQuestions ===
              0
                ? "0%"
                : `${Math.round(
                    (solvedQuestions /
                      totalQuestions) *
                      100
                  )}%`
            }
          />

        </div>

        {/* PRACTICE MODE */}

        <PracticePanel
          questions={
            questions
          }
          startPractice={
            startPractice
          }
        />

        {/* DAILY MISSION */}

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
          startSession={
            startSession
          }
        />

        {/* PROGRESS */}

        <ProgressStats
          totalSolved={
            solvedQuestions
          }
          easySolved={
            easySolved
          }
          mediumSolved={
            mediumSolved
          }
          hardSolved={
            hardSolved
          }
          questions={
            questions
          }
        />

        {/* REVISION DUE */}

        <section className="question-section">

          <div className="section-header">

            <div>

              <h2>
                📖 Revision Due
              </h2>

              <p>
                Questions that are
                ready for revision.
              </p>

            </div>

          </div>

          {revisionDueCount ===
          0 ? (
            <div className="empty-state">

              <h3>
                🎉 No revisions due!
              </h3>

              <p>
                You're all caught up.
                Keep solving new
                questions.
              </p>

            </div>
          ) : (
            <div className="question-list">

              {questions
                .filter(
                  (question) =>
                    isRevisionDue(
                      question
                    )
                )
                .sort(
                  (a, b) =>
                    new Date(
                      a.nextRevision
                    ).getTime() -
                    new Date(
                      b.nextRevision
                    ).getTime()
                )
                .slice(0, 5)
                .map(
                  (question) => (
                    <QuestionCard
                      key={
                        question.id
                      }
                      question={
                        question
                      }
                      completeQuestion={
                        completeQuestion
                      }
                      sessionType="revision"
                    />
                  )
                )}

            </div>
          )}

        </section>

        {/* QUESTION BANK */}

        <section className="question-section">

          <div className="section-header">

            <div>

              <h2>
                📚 Question Bank
              </h2>

              <p>
                Practice important
                interview questions.
              </p>

            </div>

          </div>

          {/* FILTERS */}

          <div className="filters">

            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Status
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

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Difficulty
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

            <select
              value={topic}
              onChange={(e) =>
                setTopic(
                  e.target.value
                )
              }
            >
              {topics.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item ===
                    "All"
                      ? "All Topics"
                      : item}
                  </option>
                )
              )}
            </select>

            <select
              value={pattern}
              onChange={(e) =>
                setPattern(
                  e.target.value
                )
              }
            >
              {patterns.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item ===
                    "All"
                      ? "All Patterns"
                      : item}
                  </option>
                )
              )}
            </select>

            <select
              value={company}
              onChange={(e) =>
                setCompany(
                  e.target.value
                )
              }
            >
              {companies.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item ===
                    "All"
                      ? "All Companies"
                      : item}
                  </option>
                )
              )}
            </select>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
            >
              <option value="default">
                Learning Order
              </option>

              <option value="difficulty">
                Difficulty
              </option>

              <option value="importance">
                Importance
              </option>
            </select>

          </div>

          {/* QUESTIONS */}

          {filteredQuestions.length ===
          0 ? (
            <div className="empty-state">

              <h3>
                No questions found
              </h3>

              <p>
                Try changing your
                filters.
              </p>

            </div>
          ) : (
            <div className="question-list">

              {filteredQuestions.map(
                (question) => (
                  <QuestionCard
                    key={
                      question.id
                    }
                    question={
                      question
                    }
                    completeQuestion={
                      completeQuestion
                    }
                  />
                )
              )}

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default Dashboard;