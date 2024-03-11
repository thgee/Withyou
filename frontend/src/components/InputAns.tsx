import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useRef, FC } from "react";
import { InputAnsProps } from "../types/types";
import styles from "../styles/componentStyles/InputAns.module.scss";

const InputAns: FC<InputAnsProps> = ({
  ans,
  setAns,
  onClick,
  isLoading,
  isError,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [rows, setRows] = useState(1);

  useEffect(() => {
    adjustTextareaHeight();
  }, [ans]);

  // textarea 높이 자동조절
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea == null) return;
    textarea.style.height = "auto";
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
        rows={rows}
        value={isError ? "면접을 다시 시작해 주세요." : (ans as string)}
        onChange={(e) => {
          setAns(e.target.value);
          adjustTextareaHeight();
        }}
        onKeyPress={handleEnter}
        placeholder="Type your answer"
      />
      {isLoading ? (
        <img
          width="34px"
          src={`${process.env.PUBLIC_URL}/assets/Spinner1.gif`}
        />
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
