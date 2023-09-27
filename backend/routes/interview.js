const express = require("express");
const router = express.Router();

require("dotenv").config(); // 환경변수 설정
const { Configuration, OpenAIApi } = require("openai");
const initPrompt = require("../utils/initPrompt");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API,
});

const openai = new OpenAIApi(configuration);

router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.post("/", async function (req, res) {
  let { messages } = req.body;
  let prompt = [...initPrompt, ...messages]; // 초기프롬프트와 대화내역을 프롬프트에 넣어줌

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500, // max token : 4097
      messages: prompt,
    });

    messages.push(completion.data.choices[0].message);
    res.status(200).json(messages);
  } catch (err) {
    console.log(messages);
    console.log(err.message);
    res.status(400).json(err);
  }
});

module.exports = router;
