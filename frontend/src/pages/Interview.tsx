import { useState, useRef, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import InputAns from "../components/InputAns";
import styles from "../styles/pageStyles/Interview.module.scss";
import { FC } from "react";

const Interview: FC = () => {
  const [messages, setMessages] = useState<{ content: String; role: String }[]>(
    []
  ); // 대화 내역
  const [ans, setAns] = useState(""); // 면접자 답변
  const [isLoading, setIsLoading] = useState(false); // gpt 답변 기다리는 중
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스크롤을 항상 가장 아래로 이동
    if (chatListRef.current !== null)
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
    <div className={styles.Interview}>
      <div className={styles.chatList} ref={chatListRef}>
        {messages.map((it, idx) => (
          <ChatBox key={idx} text={it.content} role={it.role} />
        ))}
        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles[`loading-text`]}>
              면접관이 답변을 준비하고 있습니다
            </div>
            <img
              width="30px"
              src={`${process.env.PUBLIC_URL}/assets/Spinner2.gif`}
            />
          </div>
        ) : null}
      </div>
      <InputAns
        ans={ans}
        onClick={handleSubmit}
        setAns={setAns}
        isLoading={isLoading}
      />
      <button className={styles.continue_btn} onClick={handleSubmit}>
        계속 진행
      </button>
    </div>
  );
};

export default Interview;
