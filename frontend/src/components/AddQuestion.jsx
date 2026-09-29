import { useState } from "react";

function AddQuestion({ addQuestion }) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [topic, setTopic] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "" || topic.trim() === "") {
      alert("Please fill Question Name and Topic");
      return;
    }

    const newQuestion = {
      id: Date.now(),
      title: title,
      difficulty: difficulty,
      topic: topic,
    };

    addQuestion(newQuestion);

    setTitle("");
    setDifficulty("Easy");
    setTopic("");
  }

  return (
    <div className="add-question">
      <h2>Add New Question</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Question Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <br />
        <br />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <br />
        <br />

        <button type="submit">
          Add Question
        </button>

      </form>
    </div>
  );
}

export default AddQuestion;