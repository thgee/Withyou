import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [ans, setAns] = useState("");

  const [res, setRes] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:3000/interview`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, job: job }),
    });

    const data = await response.json();
    console.log(data);
    await setRes(data);
  };

  return (
    <div className="App">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        placeholder="이름"
      />
      <input
        type="text"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        placeholder="지원 직무"
      />
      <input
        type="text"
        value={ans}
        onChange={(e) => setAns(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        placeholder="답변"
      />
      <button onClick={handleSubmit}> 전송 </button>
      <pre>{res.assistant}</pre>
    </div>
  );
}

export default App;
