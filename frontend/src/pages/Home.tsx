import { FC, useState } from "react";
import styles from "../styles/pageStyles/Home.module.scss";

import HomeRightContainer from "../components/Home/HomeRightContainer";
import HomeLeftContainer from "../components/Home/HomeLeftContainer";

const Home: FC = () => {
  return (
    <div className={styles.Home}>
      <HomeLeftContainer />
      <HomeRightContainer />
    </div>
  );
};

export default Home;
