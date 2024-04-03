import styles from "../../styles/componentStyles/HomeRightContainer.module.scss";
import { FC, useContext, useEffect, useState } from "react";
import { HomeRightContainerProps } from "../../types/types";
import { Transition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { nameJobContext } from "../../App";
import { NameJobContext } from "../../types/types";

const HomeRightContainer: FC<HomeRightContainerProps> = ({
  selectedMode,
  rightContainerRef,
}) => {
  const { name, setName, job, setJob } = useContext(
    nameJobContext
  ) as NameJobContext;

  // 마운트 시 이름과 직업 공백으로 초기화
  useEffect(() => {
    setName("");
    setJob("");
  }, []);

  const navigator = useNavigate();

  const handleInterviewStart = () => {
    navigator(`/interview/${selectedMode}`);
  };

  return (
    <Transition in={selectedMode !== -1} timeout={500}>
      {(state: any) => (
        <div
          ref={rightContainerRef}
          className={`${styles.HomeRightContainer} ${styles[state]}`}
        >
          <h3>이름과 직무를 입력하세요</h3>

          <div className={styles.input_user_info_box}>
            <h4>이름</h4>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <h4>직무</h4>
            <input
              type="text"
              placeholder="직무를 입력하세요"
              value={job}
              onChange={(e) => {
                setJob(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") handleInterviewStart();
              }}
            />
            <button onClick={handleInterviewStart}>면접 시작</button>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default HomeRightContainer;
