import styles from "../../styles/componentStyles/HomeRightContainer.module.scss";
import { FC } from "react";

const HomeRightContainer: FC = ({}) => {
  return (
    <div className={styles.HomeRightContainer}>
      <h3>이름과 직무를 입력하세요</h3>

      <div className={styles.input_user_info_box}>
        <h4>이름</h4>
        <input type="text" placeholder="이름을 입력하세요" />
        <h4>직무</h4>
        <input type="text" placeholder="직무를 입력하세요" />
        <button>면접 시작</button>
      </div>
    </div>
  );
};

export default HomeRightContainer;
