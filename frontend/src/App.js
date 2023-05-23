import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [ans, setAns] = useState("");
  const [userMsgs, setUserMsgs] = useState([]);
  const [assistantMsgs, setAssistantMsgs] = useState([]);

  const handleStartInterview = async () => {
    const response = await fetch(`http://localhost:3000/interview`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        job: job,
      }),
    });
  };

  const handleSubmit = async () => {
    // state는 비동기로 이루어지므로, userMsgs를 직접 사용하면
    // 업데이트 되기 이전의 값이 api의 body로 들어가게 된다.
    // 따라서, updatedUserMsgs라는 새로운 배열을 이용하여 처리한다.
    const updatedUserMsgs = [...userMsgs, ans];
    setUserMsgs(updatedUserMsgs);

    const response = await fetch(`http://localhost:3000/interview`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMsgs: updatedUserMsgs,
        assistantMsgs: assistantMsgs,
      }),
    });

    const data = await response.json();
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
        placeholder="이름을 입력해주세요"
      />
      <input
        type="text"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        onKeyPress={handleEnter}
        placeholder="지원 직무를 입력해주세요"
      />

      <button onClick={handleStartInterview}> 면접 시작 </button>

      <input
        type="text"
        value={ans}
        onChange={(e) => setAns(e.target.value)}
        onKeyPress={handleEnter}
        placeholder="답변"
      />
      <button onClick={handleSubmit}> 전송 </button>

      {assistantMsgs.map((it, idx) => (
        <div key={idx}>{it}</div>
      ))}
    </div>
  );
}

export default App;
