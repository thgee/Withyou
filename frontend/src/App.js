import { useState, useRef, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import InputAns from "./components/InputAns";
import "./App.css";

function App() {
  // const [name, setName] = useState("");
  // const [job, setJob] = useState("");
  const [messages, setMessages] = useState([]);
  const [ans, setAns] = useState("");
  const chatListRef = useRef(null);

  useEffect(() => {
    // 스크롤을 항상 가장 아래로 이동
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async () => {
    setAns("");
    const updatedMessages = [...messages, { role: "user", content: `${ans}` }];
    setMessages(updatedMessages);

    const response = await fetch(`http://localhost:8080/interview`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: name,
        // job: job,
        messages: updatedMessages,
      }),
    });

    const data = await response.json();
    await setMessages(data);
  };

  return (
    <div className="App">
      {/* <input
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
      /> */}

      <div className="chatList" ref={chatListRef}>
        {messages.map((it, idx) => (
          <ChatBox key={idx} text={it.content} role={it.role} />
        ))}
      </div>

      <InputAns ans={ans} onClick={handleSubmit} setAns={setAns} />
    </div>
  );
}

export default App;
