import styles from "./HomeRightContainer.module.scss";
import { FC, useContext, useEffect, useRef, useState } from "react";
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

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputJobRef = useRef<HTMLInputElement>(null);
  const [inputNotice, setInputNotice] = useState<boolean>(false);

  const handleInterviewStart = () => {
    if (name.length === 0 && inputNameRef.current) {
      inputNameRef.current.focus();
      setInputNotice(true);
      return;
    }
    if (job.length === 0 && inputJobRef.current) {
      inputJobRef.current.focus();
      setInputNotice(true);
      return;
    }

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
            <div className={styles.info_wrapper}>
              <h4>이름</h4>
              <input
                ref={inputNameRef}
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter" && inputJobRef.current !== null)
                    inputJobRef.current.focus();
                }}
              />
              {inputNotice && name.length === 0 && (
                <div className={styles.notice_text}>이름을 입력해주세요</div>
              )}
            </div>

            <div className={styles.info_wrapper}>
              <h4>직무</h4>
              <input
                ref={inputJobRef}
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

              {inputNotice && job.length === 0 && (
                <div className={styles.notice_text}>직무를 입력해주세요</div>
              )}
            </div>

            <button onClick={handleInterviewStart}>면접 시작</button>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default HomeRightContainer;
