const express = require("express");
const app = express();
const port = 3000;

// Define topics and difficulties
const topics = ["JavaScript", "Python", "React"];
const difficulties = ["easy", "medium", "hard"];

// Function to generate a question based on topic and difficulty
const generateQuestion = (topic, difficulty) => {
  const questions = {
    JavaScript: {
      easy: [
        "What is a variable in JavaScript?",
        "What is the difference between `var`, `let`, and `const` in JavaScript?",
        "What is a closure in JavaScript?",
        "How do you declare a function in JavaScript?",
        "What is a callback function in JavaScript?",
      ],
      medium: [
        "Explain event delegation in JavaScript.",
        "What is a promise in JavaScript?",
        "How does asynchronous code work in JavaScript?",
        "What is the difference between `null` and `undefined`?",
        "What is the purpose of the `bind` method in JavaScript?",
      ],
      hard: [
        "What is the event loop in JavaScript, and how does it work?",
        "Explain the concept of the `new` keyword in JavaScript.",
        "How do promises work under the hood in JavaScript?",
        "Explain the concept of `debouncing` and `throttling` in JavaScript.",
        "What is the purpose of the `Symbol` type in JavaScript?",
      ],
    },
    Python: {
      easy: [
        "What is a list in Python?",
        "What is the difference between a list and a tuple in Python?",
        "How do you define a function in Python?",
        "What is a dictionary in Python?",
        "What are Python decorators?",
      ],
      medium: [
        "Explain list comprehension in Python.",
        "How does Python handle memory management and garbage collection?",
        "What is the use of the `with` statement in Python?",
        "What is a lambda function in Python?",
        "Explain the concept of iterators and generators in Python.",
      ],
      hard: [
        "What is the purpose of the `asyncio` module in Python?",
        "What are metaclasses in Python?",
        "How does Python's threading model work?",
        "What is the purpose of `__init__` and `__new__` in Python?",
        "Explain Python's context managers and how they are used.",
      ],
    },
    React: {
      easy: [
        "What is a component in React?",
        "What is JSX in React?",
        "What is a functional component in React?",
        "What is the difference between props and state in React?",
        "How do you handle events in React?",
      ],
      medium: [
        "What is the difference between a class component and a functional component in React?",
        "What is `useEffect` and when do you use it in React?",
        "Explain `useState` in React and provide an example.",
        "What is the purpose of `React.memo()`?",
        "What is the context API in React and how do you use it?",
      ],
      hard: [
        "Explain the concept of React hooks and their usage.",
        "What is the purpose of `useReducer` in React?",
        "How does the virtual DOM work in React?",
        "Explain the reconciliation algorithm in React.",
        "What are server-side rendering (SSR) and static site generation (SSG) in React?",
      ],
    },
  };

  // Validate topic and difficulty, then return a random question
  if (questions[topic] && questions[topic][difficulty]) {
    const questionSet = questions[topic][difficulty];
    return questionSet[Math.floor(Math.random() * questionSet.length)];
  } else {
    return `No question available for ${topic} with ${difficulty} difficulty.`;
  }
};

// Route to generate a question
app.get("/generate-question", (req, res) => {
  try {
    // Randomly select a topic and difficulty
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomDifficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];

    // Generate a question
    const question = generateQuestion(randomTopic, randomDifficulty);

    // Check if a valid question was generated
    if (question.startsWith("No question available")) {
      return res.status(400).json({
        error: "No question generated",
        topic: randomTopic,
        difficulty: randomDifficulty,
        message: question,
      });
    }

    // Respond with the generated question
    res.json({
      topic: randomTopic,
      difficulty: randomDifficulty,
      question: question,
    });
  } catch (error) {
    console.error("Error generating question:", error);
    res.status(500).json({ error: "Failed to generate question" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`AI Interviewer backend running at http://localhost:${port}`);
});
