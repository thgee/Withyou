import { FC, useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss";

import HomeRightContainer from "../components/Home/HomeRightContainer";
import { Transition } from "react-transition-group";
import HomeLeftContainer from "../components/Home/HomeLeftContainer";

const Home: FC = () => {
  const [selectedMode, setSelectedMode] = useState<Number>(-1);

  // rightContainer의 width를 가져오기 위한 변수
  const [rightContainerWidth, setRightContainerWidth] = useState<number | null>(
    null
  );
  const rightContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rightContainerRef.current) {
      const width = rightContainerRef.current.offsetWidth;
      setRightContainerWidth(width);
    }
  }, []);

  return (
    <div className={styles.Home}>
      <div className={styles.home_wrapper}>
        <Transition in={selectedMode !== -1} timeout={100}>
          {(state: any) => (
            <HomeLeftContainer
              rightContainerWidth={rightContainerWidth}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              state={state}
            />
          )}
        </Transition>

        <HomeRightContainer
          selectedMode={selectedMode}
          rightContainerRef={rightContainerRef}
        />
      </div>
    </div>
  );
};

export default Home;
