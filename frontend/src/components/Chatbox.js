const ChatBox = ({ text, role }) => {
  return (
    <div className={`ChatBox ${role}`}>
      <div className="text">{text}</div>
    </div>
  );
};

export default ChatBox;
