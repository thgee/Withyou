import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useRef, FC } from "react";
import { InputAnsProps } from "../../types/types";
import styles from "./InputAns.module.scss";
import { useMediaQuery } from "react-responsive";
import { mobileQuery } from "../../constants/constants";

const InputAns: FC<InputAnsProps> = ({
  ans,
  setAns,
  onClick,
  isLoading,
  isError,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const isMobile = useMediaQuery({
    query: mobileQuery,
  });

  useEffect(() => {
    adjustTextareaHeight();
  }, [ans]);

  useEffect(() => {
    // 로딩 끝나면 바로 입력 가능하도록 focus 설정 (PC환경 일때만)
    if (!isMobile) textareaRef.current?.focus();
  }, [isLoading]);

  // 처음 textarea의 높이를 저장할 변수
  const fisrtTextareaHeight = useRef<number | undefined>();

  useEffect(() => {
    // 마운트 시 첫 높이 저장
    fisrtTextareaHeight.current = textareaRef.current?.clientHeight;
  }, []);

  // textarea 높이 자동조절
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea == null) return;

    // 처음 height인 1줄짜리 height로 초기화
    textarea.style.height = "auto";

    // textarea 높이가 처음 높이보다 어느정도 커지면 더이상 커지지 않게 함
    if (
      fisrtTextareaHeight.current !== undefined &&
      textarea.scrollHeight > fisrtTextareaHeight.current * 7
    ) {
      textarea.style.height = `${fisrtTextareaHeight.current * 7}px`;
      return;
    }

    // scrollHeight만큼 textarea를 증가시킴
    textarea.style.height = `${textarea.scrollHeight}px`;

    setTextareaHeight(`${textarea.scrollHeight}px`);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      if (ans.length === 0) return;
      onClick();
    }
  };

  return (
    <div className={styles.InputAns}>
      <textarea
        ref={textareaRef}
        style={{ height: textareaHeight }}
        rows={1}
        value={isError ? "면접을 다시 시작해 주세요." : (ans as string)}
        onChange={(e) => {
          setAns(e.target.value);
          adjustTextareaHeight();
        }}
        onKeyPress={handleEnter}
        placeholder="Type your answer"
      />
      {isLoading ? (
        <div className={styles.spinner_wrapper}>
          <img
            className={styles.spinner}
            src={`${process.env.PUBLIC_URL}/assets/Spinner1.gif`}
          />
        </div>
      ) : (
        <FontAwesomeIcon
          className={styles.submitIcon}
          icon={faPaperPlane}
          onClick={() => {
            if (ans.length === 0) return; // 면접자가 아무 내용도 입력하지 않았을 경우 전송 불가
            onClick();
          }}
        />
      )}
    </div>
  );
};

export default InputAns;
