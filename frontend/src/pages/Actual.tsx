import { useState, useRef, useEffect, useContext } from "react";
import ChatBox from "../components/ChatBox";
import InputAns from "../components/InputAns";
import styles from "../styles/pageStyles/Actual.module.scss";
import { FC } from "react";
import { nameJobContext } from "../App";
import { NameJobContext } from "../types/types";

const Actual: FC = () => {
  const { name, job } = useContext(nameJobContext) as NameJobContext;
  const [messages, setMessages] = useState<{ content: String; role: String }[]>(
    []
  ); // 대화 내역
  const [ans, setAns] = useState<String>(""); // 면접자 답변
  const [isLoading, setIsLoading] = useState<boolean>(false); // gpt 답변 기다리는 중
  const [isError, setIsError] = useState<boolean>(false); // 토큰초과로 면접 종료될때 변경되는 플래그
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
    if (isLoading || isError) return;
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
        name: name,
        job: job,
        messages: updatedMessages,
      }),
    });

    const data = await response.json();

    if (response.status === 400) {
      setMessages([
        ...messages,
        {
          content:
            "면접이 너무 길어져 더 이상 진행할 수 없습니다.\n면접을 다시 시작해 주시기 바랍니다.\n불편을 드려 죄송합니다.",
          role: "assistant",
        },
      ]);
      setIsError(true);
    }
    if (response.status === 200) {
      setMessages(data);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.Actual}>
      <div className={styles.actual_container}>
        <div className={styles.actual_left}>
          <div className={styles.title}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              width={"50px"}
            />
            <h2>{`연습면접`}</h2>
          </div>
          <div className={styles.mode_wrapper}>
            <h4>MODE</h4>
            <ul>
              <li>
                폰트어썸<span>실전면접</span>
              </li>
              <li>
                폰트어썸<span>하드면접</span>
              </li>
              <li>
                폰트어썸<span>시뮬레이션</span>
              </li>
            </ul>
          </div>
          <div className={styles.extra_wrapper}>
            <h4>EXTRA</h4>
            <ul>
              <li>
                폰트어썸<span>면접 재시작</span>
              </li>
              <li>
                폰트어썸<span>처음 화면</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.actual_right}>
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
            isError={isError}
          />
          <button className={styles.continue_btn} onClick={handleSubmit}>
            계속 진행
          </button>
        </div>
      </div>
    </div>
  );
};

export default Actual;
