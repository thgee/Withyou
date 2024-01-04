import { FC } from "react";
import styles from "../styles/pageStyles/Home.module.scss";

const Home: FC = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.main_container}>
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
          <div className={styles.mode_box}>
            <h3>연습면접</h3>
            <p>
              끝없이 계속되는 질문에 <br />
              답변해야 하는 면접
            </p>
          </div>

          <div className={styles.mode_box}>
            <h3>실전면접</h3>
            <p>
              4가지 질문으로 진행되고
              <br />
              전체적인 피드백을 받는 면접
            </p>
          </div>

          <div className={styles.mode_box}>
            <h3>하드면접</h3>
            <p>
              까다로운 면접관을 만났을 <br />
              경우를 대비한 면접
            </p>
          </div>

          <div className={styles.mode_box}>
            <h3>시뮬레이션</h3>
            <p>
              숙련된 면접자의 답변을 볼 수 <br />
              있는 면접 시뮬레이션
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
