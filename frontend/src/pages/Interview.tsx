import { useState, useRef, useEffect, useContext } from "react";
import ChatBox from "../components/Interview/ChatBox";
import InputAns from "../components/Interview/InputAns";
import styles from "./Interview.module.scss";
import { FC } from "react";
import { nameJobContext } from "../App";
import { NameJobContext } from "../types/types";

import { useNavigate, useParams } from "react-router-dom";
import { interviewModes, mobileQuery } from "../constants/constants";
import { useSpring, animated } from "@react-spring/web";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Interview/Navbar";

// Interview 컴포넌트 등장 애니메이션
const interviewAnimation = {
  from: {
    width: "0%",
    opacity: "0%",
    transform: "rotate(270deg) scale(0)",
  },
  to: {
    width: "100%",
    opacity: "100%",
    transform: "rotate(360deg) scale(1)",
  },
};

const Interview: FC = () => {
  const { selectedMode } = useParams();
  const restartToggle = useRef<boolean>(false); // 모드변경, 재시작 판정 토글
  const { name, job } = useContext(nameJobContext) as NameJobContext;
  const [messages, setMessages] = useState<{ content: String; role: String }[]>(
    []
  ); // 대화 내역
  const [ans, setAns] = useState<String>(""); // 면접자 답변
  const [isLoading, setIsLoading] = useState<boolean>(false); // gpt 답변 기다리는 중
  const [isError, setIsError] = useState<boolean>(false); // 토큰초과로 면접 종료될때 변경되는 플래그
  const chatListRef = useRef<HTMLDivElement>(null);

  const abortController = useRef<AbortController | null>(null); // 모드 변경 전 API 호출을 중지시키기 위한 ref
  const isMount = useRef<boolean>(true); // 첫 마운트인지 아닌지 판단하기 위한 ref, gpt가 첫 마디를 할 때 false로 변경됨
  const navigate = useNavigate();

  const isMobile = useMediaQuery({
    query: mobileQuery,
  });

  useEffect(() => {
    // 면접내역 스크롤을 항상 가장 아래로 이동
    if (chatListRef.current !== null)
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages]);

  // animated.div 컴포넌트 마운트 시 발동하는 효과
  const [springs, api] = useSpring(() => interviewAnimation);

  useEffect(() => {
    // 모드가 바뀌는 것은 pathvariable에 의해 페이지 이동을 하므로 컴포넌트가 리마운트 되지 않는다.
    // 따라서 마운트 플래그를 따로 선언해준다.
    isMount.current = true;

    // 페이지 마운트 시 gpt부터 말하도록 submit 함수를 호출
    handleSubmit();

    // 모드 변경 시 발동하는 효과
    api.start(interviewAnimation);

    // 클린업 함수를 이용하여 모드가 바뀌기 전의 API 호출을 중지시킴
    return () => {
      abortController.current?.abort();
    };
  }, [restartToggle.current]);

  // 모드 변경 시 대화내역 초기화 후 페이지 이동하는 함수
  const handleChangeMode = (modeNum: Number) => {
    restartToggle.current = !restartToggle.current;
    setMessages([]);
    setAns("");
    setIsError(false);
    navigate(`/interview/${modeNum}`);
  };

  const handleSubmit = async () => {
    if (!isMount.current && (isLoading || isError)) return;
    setIsLoading(true);
    isMount.current = false;

    setAns("");
    const updatedMessages = [
      ...messages,
      ...(ans ? [{ role: "user", content: `${ans}` }] : []),
    ];
    setMessages(updatedMessages);

    abortController.current = new AbortController();
    const response = await fetch(
      `http://localhost:8080/interview/${selectedMode}`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          job: job,
          messages: updatedMessages,
        }),
        signal: abortController.current?.signal,
      }
    );

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
    <animated.div style={springs} className={styles.Interview}>
      <div className={styles.interview_container}>
        <div className={styles.interview_left}>
          <div
            onClick={() => {
              navigate("/");
            }}
            className={styles.title}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              width={"50px"}
            />
            <h2>{interviewModes[Number(selectedMode)].title}</h2>
          </div>
          <Navbar
            selectedMode={Number(selectedMode)}
            handleChangeMode={handleChangeMode}
          />
        </div>
        <div className={styles.interview_right}>
          <div className={styles.interview_right_wrapper}>
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
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Interview;
