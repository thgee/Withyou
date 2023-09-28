const summarizePrompt = async (message, openai) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.3,
      max_tokens: 1000, // max token : 4097
      messages: [
        {
          role: "system",
          content: "입력되는 문장을 핵심만 넣어서 최대한 짧게 요약해줘.",
        },
        { role: "user", content: message },
      ],
    });

    return completion.data.choices[0].message;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = summarizePrompt;
