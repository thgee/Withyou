import { Key } from "react";

export const interviewModes: {
  key: Key;
  title: String;
  description: String;
}[] = [
  {
    key: 0,
    title: "연습면접",
    description: "끝없이 계속되는 질문에 답변해야 하는 면접",
  },
  {
    key: 1,
    title: "실전면접",
    description: "4가지 질문으로 진행되고 전체적인 피드백을 받는 면접",
  },
  {
    key: 2,
    title: "하드면접",
    description: "까다로운 면접관을 만났을 경우를 대비한 면접",
  },
  {
    key: 3,
    title: "시뮬레이션",
    description: "숙련된 면접자의 답변을 볼 수 있는 면접 시뮬레이션",
  },
];
