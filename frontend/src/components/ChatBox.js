const ChatBox = ({ text, role }) => {
  return (
    <div className={`ChatBox ${role}`}>
      <pre className="text">{text}</pre>
    </div>
  );
};

export default ChatBox;
