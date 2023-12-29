const router = require("express").Router();
const initPrompt = require("../utils/initPrompt");

router.post("/", async function (req: any, res: any) {
  const openai = req.openai;
  let { messages } = req.body;

  let prompt = [...initPrompt, ...messages]; // 초기프롬프트와 대화내역을 프롬프트에 넣어줌
  console.log(
    `=====================방금 들어간 프롬프트 내용====================`
  );
  console.log(prompt);

  try {
    // GPT 호출
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500, // max token : 4097
      messages: prompt,
    });

    // messages 배열에 gpt 결과를 삽입 후 프론트로 보냄
    messages.push(completion.data.choices[0].message);
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
