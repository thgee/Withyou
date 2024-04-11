import { RefObject } from "react";

interface InterviewFlowAPIType {
  (
    updatedMessages: { role: String; content: String }[],
    name: String,
    job: String,
    selectedMode: String | undefined,
    abortController: RefObject<AbortController>
  ): Promise<Response>;
}

const InterviewFlowAPI: InterviewFlowAPIType = async (
  updatedMessages,
  name,
  job,
  selectedMode,
  abortController
) => {
  return await fetch(
    `${process.env.REACT_APP_DOMAIN}/interview/${selectedMode}`,
    {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        job: job,
        messages: updatedMessages,
      }),
      signal: abortController.current?.signal,
    }
  );
};

export default InterviewFlowAPI;
