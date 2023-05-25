require("dotenv").config(); // 환경변수 설정
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
let cors = require(`cors`);

const app = express();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API,
});

const openai = new OpenAIApi(configuration);

// CORS 이슈 해결
app.use(cors());

// POST 요청 받을 수 있도록 만듬
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/interview", async function (req, res) {
  let { userMsgs, assistantMsgs } = req.body;
  console.log(assistantMsgs);
  console.log(userMsgs);

  let messages = [
    {
      role: `system`,
      content: `
    - 당신은 세계 최고의 면접관입니다.
    - 당신은 면접자의 능력을 파악할 수 있는 날카로운 질문을 제시해야 합니다.
    - 질문은 면접자의 지원분야의 수준을 파악할 수 있는 기술질문과, 면접자의 성향을 파악하기 위한 공통질문으로 나뉘어집니다.
    - 당신은 한번의 발언에 최대 10토큰 끼지만 사용할 수 있습니다.
    `,
    },
    {
      role: `user`,
      content: `
    안녕하세요 면접관님, 저는 지원자 ${req.body.name} 입니다. 제가 지원한 직무는 ${req.body.job} 입니다.`,
    },
  ];

  while (userMsgs.length != 0 && assistantMsgs.length != 0) {
    messages.push({
      role: `assistant`,
      content: `${String(assistantMsgs.shift()).replace(/\n|\r|\s*/g, "")}`,
    });
    messages.push({
      role: `user`,
      content: `${String(userMsgs.shift()).replace(/\n|\r|\s*/g, "")}`,
    });
  }

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    max_tokens: 200,
    messages: messages,
  });

  let question = completion.data.choices[0].message[`content`];
  res.json({ assistant: question });
});

app.listen(3000);
