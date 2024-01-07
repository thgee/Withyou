import { FC, useState } from "react";
import styles from "../styles/pageStyles/Home.module.scss";
import { interviewModes } from "../constants/constants";
import ModeBox from "../components/Home/ModeBox";

const Home: FC = () => {
  const [selectedMode, setSelectedMode] = useState<Number>(-1);

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
    </div>
  );
};

export default Home;
