export interface InputAnsProps {
  ans: string;
  setAns: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
  isLoading: boolean;
}

export interface ChatBoxProps {
  text: String;
  role: String;
}
