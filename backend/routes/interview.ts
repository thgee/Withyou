const router = require("express").Router();
const initPrompt = require("../utils/initPrompt");

router.post("/", async function (req: any, res: any) {
  const openai = req.openai;
  let { name, job, messages } = req.body;

  let prompt = [...initPrompt(name, job), ...messages]; // 초기프롬프트와 대화내역을 프롬프트에 넣어줌
  try {
    // GPT 호출
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0125",
      temperature: 0.5,
      max_tokens: 2, // max token : 4097
      messages: prompt,
    });

    // messages 배열에 gpt 결과를 삽입 후 프론트로 보냄
    messages.push(completion.data.choices[0].message);
    res.status(200).json(messages);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    res.status(400).json(err);
  }
});

module.exports = router;
