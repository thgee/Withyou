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
  title: String;
  description: String;
}
