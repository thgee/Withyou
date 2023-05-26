const InputAns = ({ ans, setAns, onclick }) => {
  const handleEnter = (e) => {
    if (e.key === "Enter") onclick();
  };

  return (
    <div className="InputAns">
      <textarea
        value={ans}
        onChange={(e) => setAns(e.target.value)}
        onKeyPress={handleEnter}
      />

      <button onClick={onclick}> 전송 </button>
    </div>
  );
};

export default InputAns;
