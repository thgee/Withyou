import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [ans, setAns] = useState("");
  const [res, setRes] = useState("");
  const [userMsgs, setUserMsgs] = useState([]);
  const [assistantMsgs, setAssistantMsgs] = useState([]);

  const handleSubmit = async () => {
    // userMsg 배열에 현재 유저가 입력한 답변을 추가
    setUserMsgs([...userMsgs, ans]);

    const response = await fetch(`http://localhost:3000/interview`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        job: job,
        userMsgs: userMsgs,
        assistantMsgs: assistantMsgs,
      }),
    });

    const data = await response.json();
    console.log(data);
    await setAssistantMsgs([...assistantMsgs, data.assistant]);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="App">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleEnter}
        placeholder="이름"
      />
      <input
        type="text"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        onKeyPress={handleEnter}
        placeholder="지원 직무"
      />
      <input
        type="text"
        value={ans}
        onChange={(e) => setAns(e.target.value)}
        onKeyPress={handleEnter}
        placeholder="답변"
      />
      <button onClick={handleSubmit}> 전송 </button>
      {assistantMsgs.map((it) => (
        <div>{it}</div>
      ))}
    </div>
  );
}

export default App;
