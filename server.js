const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Talk Data
const talks = [
  {
    id: 1,
    title: "The Future of WebAssembly",
    speakers: ["Alex Rivers", "Sarah Chen"],
    categories: ["WebAssembly", "Performance", "Web"],
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    description: "Explore how WASM is moving beyond the browser to revolutionize server-side computing and edge networks."
  },
  {
    id: 2,
    title: "Scaling Distributed Systems with Go",
    speakers: ["Marcus Thorne"],
    categories: ["Distributed Systems", "Go", "Architecture"],
    startTime: "11:10 AM",
    endTime: "12:10 PM",
    description: "Lessons learned from scaling massive microservices architectures using Go's concurrency primitives."
  },
  {
    id: 3,
    title: "AI Ethics in Software Engineering",
    speakers: ["Elena Rodriguez"],
    categories: ["AI", "Ethics", "Best Practices"],
    startTime: "12:20 PM",
    endTime: "1:20 PM",
    description: "A deep dive into the ethical considerations and biases when integrating LLMs into the development lifecycle."
  },
  {
    id: 4,
    title: "Rust: Memory Safety Without Sacrifice",
    speakers: ["James Wilson"],
    categories: ["Rust", "Systems Programming"],
    startTime: "2:20 PM",
    endTime: "3:20 PM",
    description: "Understanding the borrow checker and why Rust is becoming the standard for safety-critical infrastructure."
  },
  {
    id: 5,
    title: "The State of Cybersecurity in 2026",
    speakers: ["Nadia Petrova", "Leo Vance"],
    categories: ["Cybersecurity", "DevSecOps"],
    startTime: "3:30 PM",
    endTime: "4:30 PM",
    description: "Analyzing the latest threat vectors and how to build resilient systems in an age of automated attacks."
  },
  {
    id: 6,
    title: "Quantifying Technical Debt",
    speakers: ["Dr. Aris Thorne"],
    categories: ["Management", "Engineering"],
    startTime: "4:40 PM",
    endTime: "5:40 PM",
    description: "Moving from intuition to metrics: how to effectively communicate and prioritize technical debt to stakeholders."
  }
];

// Serve static files from 'public' directory
app.use(express.static('public'));

// API endpoint for talks
app.get('/api/talks', (req, res) => {
  res.json(talks);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
