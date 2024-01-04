import styles from "../styles/componentStyles/ModeBox.module.scss";
import { FC } from "react";
import { ModeBoxProps } from "../types/types";

const ModeBox: FC<ModeBoxProps> = ({ title, description }) => {
  return (
    <div className={styles.ModeBox}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ModeBox;
