import styles from "../../styles/componentStyles/HomeLeftContainer.module.scss";
import { FC, useState } from "react";
import { interviewModes } from "../../constants/constants";
import ModeBox from "./ModeBox";
import { HomeLeftContainerProps } from "../../types/types";
import { Transition } from "react-transition-group";

const HomeLeftContainer: FC<HomeLeftContainerProps> = ({
  selectedMode,
  setSelectedMode,
  rightContainerWidth,
  state,
}) => {
  const moveLeftAnimation = {
    transform:
      state === "entering"
        ? `translateX(${(rightContainerWidth as number) / 2}px)`
        : "none",

    transition: state === "entered" ? "all 500ms ease-in-out" : "none",
  };

  return (
    <div className={`${styles.HomeLeftContainer}`} style={moveLeftAnimation}>
      <section className={styles.title_section}>
        <h3>합격의 지름길</h3>
        <h2>위듀</h2>
        <p>
          With you, we do
          <br />
          면접에 합격하는 그날까지 위듀는 당신 곁에 있습니다
        </p>
      </section>

      <section className={styles.select_mode_section}>
        {interviewModes.map((it) => (
          <ModeBox
            key={it.key}
            id={it.key}
            title={it.title}
            description={it.description}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
          />
        ))}
      </section>
    </div>
  );
};

export default HomeLeftContainer;
