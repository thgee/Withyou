import styles from "./ModeBox.module.scss";
import { FC } from "react";
import { ModeBoxProps } from "../../types/types";

const ModeBox: FC<ModeBoxProps> = ({
  id,
  title,
  description,
  selectedMode,
  setSelectedMode,
}) => {
  const handleSelectedMode = () => {
    // 선택되어있던 모드를 한번 더 선택한 경우
    if (selectedMode === (id as Number)) setSelectedMode(-1);
    // 다른 모드를 선택한 경우
    else setSelectedMode(id as Number);
  };

  return (
    <div
      className={`${styles.ModeBox} ${
        styles[selectedMode === (id as Number) ? "selected" : "not_selected"]
      }`}
      style={{
        left: `${50 + (Number(id) - 1) * 28}%`,
        transform: `translateX(-50%)`,
        zIndex: id === selectedMode ? 1 : 0,
      }}
      onClick={handleSelectedMode}
    >
      <h3>{title}</h3>
      <p className={`${styles.desc}`}>{description}</p>
    </div>
  );
};

export default ModeBox;
