import { FC } from "react";
import { ChatBoxProps } from "../types";

const ChatBox: FC<ChatBoxProps> = ({ text, role }) => {
  return (
    <div className={`ChatBox ${role}`}>
      <pre className="text">{text}</pre>
    </div>
  );
};

export default ChatBox;
