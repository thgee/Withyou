import { useState, useRef, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import InputAns from "./components/InputAns";
import Spinner2 from "./assets/Spinner2.gif";
import "./App.css";

function App() {
  // const [name, setName] = useState("");
  // const [job, setJob] = useState("");
  const [messages, setMessages] = useState([]);
  const [ans, setAns] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatListRef = useRef(null);

  useEffect(() => {
    // 스크롤을 항상 가장 아래로 이동
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

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

    setIsLoading(false);
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
        {isLoading ? (
          <div className="loading">
            <div className="loading-text">
              면접관이 질문을 준비하고 있습니다
            </div>
            <img width="30px" src={Spinner2} />
          </div>
        ) : null}
      </div>
      <InputAns
        ans={ans}
        onClick={handleSubmit}
        setAns={setAns}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
