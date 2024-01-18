import { Key, RefObject } from "react";

export interface HomeLeftContainerProps {
  selectedMode: Number;
  setSelectedMode: React.Dispatch<React.SetStateAction<Number>>;
  rightContainerWidth: Number | null;
  state: string;
}

export interface HomeRightContainerProps {
  selectedMode: Number;
  rightContainerRef: RefObject<HTMLDivElement>;
}

export interface InputAnsProps {
  ans: String;
  setAns: React.Dispatch<React.SetStateAction<String>>;
  onClick: () => void;
  isLoading: boolean;
  isError: boolean;
}

export interface ChatBoxProps {
  text: String;
  role: String;
}

export interface ModeBoxProps {
  id: Key;
  title: String;
  description: String;
  selectedMode: Number;
  setSelectedMode: React.Dispatch<React.SetStateAction<Number>>;
}
