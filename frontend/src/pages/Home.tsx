import { FC, useState } from "react";
import styles from "../styles/pageStyles/Home.module.scss";

import HomeRightContainer from "../components/Home/HomeRightContainer";
import HomeLeftContainer from "../components/Home/HomeLeftContainer";

const Home: FC = () => {
  const [selectedMode, setSelectedMode] = useState<Number>(-1);

  return (
    <div className={styles.Home}>
      <div className={styles.home_wrapper}>
        <HomeLeftContainer
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
        />

        <HomeRightContainer selectedMode={selectedMode} />
      </div>
    </div>
  );
};

export default Home;
