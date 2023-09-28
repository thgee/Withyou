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

  // 페이지 로드 시 gpt부터 말하도록 설정
  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    setAns("");
    const updatedMessages = [
      ...messages,
      ...(ans ? [{ role: "user", content: `${ans}` }] : []),
    ];
    setMessages(updatedMessages);

    const response = await fetch(`http://localhost:8080/interview`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: updatedMessages,
      }),
    });

    const data = await response.json();

    if (response.status === 400) {
      console.log(data.message); // gpt api 에러 발생 시
    }
    if (response.status === 200) {
      setMessages(data);
    }

    setIsLoading(false);
  };

  return (
    <div className="App">
      <div className="chatList" ref={chatListRef}>
        {messages.map((it, idx) => (
          <ChatBox key={idx} text={it.content} role={it.role} />
        ))}
        {isLoading ? (
          <div className="loading">
            <div className="loading-text">
              면접관이 답변을 준비하고 있습니다
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
