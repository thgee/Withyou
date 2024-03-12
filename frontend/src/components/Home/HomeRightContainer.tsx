import styles from "../../styles/componentStyles/HomeRightContainer.module.scss";
import { FC, useState } from "react";
import { HomeRightContainerProps } from "../../types/types";
import { Transition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

const HomeRightContainer: FC<HomeRightContainerProps> = ({
  selectedMode,
  rightContainerRef,
}) => {
  const [name, setName] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const navigator = useNavigate();

  const handleInterviewStart = () => {
    switch (selectedMode) {
      case 0:
        break;
      case 1:
        navigator("/actual");
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
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
            />
            <button onClick={handleInterviewStart}>면접 시작</button>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default HomeRightContainer;
