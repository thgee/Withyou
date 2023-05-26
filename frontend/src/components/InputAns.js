import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Spinner1 from "../assets/Spinner1.gif";
import { useState, useEffect, useRef } from "react";

const InputAns = ({ ans, setAns, onClick, isLoading }) => {
  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [rows, setRows] = useState("1");

  useEffect(() => {
    adjustTextareaHeight();
  }, [ans]);

  // textarea 높이 자동조절
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setTextareaHeight(`${textarea.scrollHeight}px`);
  };

  const handleEnter = (e) => {
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
        <img width="34px" src={Spinner1} />
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
