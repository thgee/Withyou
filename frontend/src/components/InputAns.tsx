import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useRef, FC } from "react";
import { InputAnsProps } from "../types";

const InputAns: FC<InputAnsProps> = ({ ans, setAns, onClick, isLoading }) => {
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="InputAns">
      <textarea
        ref={textareaRef}
        style={{ height: textareaHeight }}
        rows={rows}
        value={ans}
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
          className="submitIcon"
          icon={faPaperPlane}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default InputAns;
