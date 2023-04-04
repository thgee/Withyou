import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState([]);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSubmit = async () => {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: `system`,
          content: `
          - 당신은 세계 최고의 면접관입니다.
          - 당신은 면접자의 능력을 파악할 수 있는 날카로운 질문을 제시해야 합니다.
          - 질문은 면접자의 지원분야와 관련된 기술질문과, 면접자의 성향을 파악하기 위한 공통질문으로 나뉘어집니다.
          - 면접은 기술면접 질문 3가지가 하나씩 진행된 이후, 공통면접 질문 3가지가 하나씩 진행됩니다.
          - 당신은 면접자가 답변하면 올바른 답변인지 판단하고, 반드시 모범답변을 제시해야 합니다.
          - 모범답변은 간결하게, 실제 면접에서 답변하듯이 30자 이내로 간결하게 제시해야 합니다.
          - 면접은 면접관과 면접자가 대화하듯이 묻고 답하는 형식으로 진행됩니다.
          - 질문에 대한 자세한 설명은 답변이 진행된 이후에 출력하며, 질문할 때에는  다음 예시를 지켜주세요.

          예시 :
          세 번째 질문입니다.
          웹 사이트의 로딩 속도를 높이기 위한 방법에 대해 설명해주세요.`,
        },
        {
          role: `user`,
          content: `
          안녕하세요 면접관님, 저는 지원자 ${name} 입니다. 제가 지원한 직무는 ${job} 입니다.`,
        },
        {
          role: `assistant`,
          content: `
          이태혁님 반갑습니다. 저는 면접관입니다. 
          질문에 대한 답변을 하시면 옳은지 판단한 후 모범답변을 실제 면접에서 답변하듯이 30자 이내로 간결하게 보여드리겠습니다.  
          기술 면접부터 시작하겠습니다.`,
        },
      ],
    });

    setMessage(completion.data.choices[0].message.content);
  };

  return (
    <div className="App">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        type="text"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        placeholder="지원 직무"
      />
      <button onClick={handleSubmit}> 전송 </button>
      <pre>{message}</pre>
    </div>
  );
}

export default App;
