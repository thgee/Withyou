import { FC } from "react";
import styles from "./Navbar.module.scss";
import { NavbarProps } from "../../types/types";
import { FaMountainSun } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import { IoHomeSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { mobileQuery } from "../../constants/constants";

const Navbar: FC<NavbarProps> = ({
  selectedMode,
  handleChangeMode,
  navbarToggle,
  setNavbarToggle,
}) => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery({
    query: mobileQuery,
  });

  return (
    <div
      className={`${styles.Navbar} ${
        navbarToggle ? styles.appear : styles.disappear
      }`}
    >
      {isMobile && (
        <FaXmark
          color="#aaa"
          className={styles.cancel}
          onClick={() => {
            setNavbarToggle(!navbarToggle);
          }}
        />
      )}
      <div className={styles.mode_wrapper}>
        <div className={styles.mode_title}>MODE</div>
        <ul>
          <li
            className={Number(selectedMode) === 0 ? styles.selected : "none"}
            onClick={() => handleChangeMode(0)}
          >
            <FaBookOpen color="999" />
            <span>연습면접</span>
          </li>
          <li
            className={Number(selectedMode) === 1 ? styles.selected : "none"}
            onClick={() => handleChangeMode(1)}
          >
            <AiFillWechat color="999" />
            <span>실전면접</span>
          </li>
          <li
            className={Number(selectedMode) === 2 ? styles.selected : "none"}
            onClick={() => handleChangeMode(2)}
          >
            <FaMountainSun color="999" />
            <span>하드면접</span>
          </li>
        </ul>
      </div>
      <div className={styles.extra_wrapper}>
        <div className={styles.mode_title}>EXTRA</div>
        <ul>
          <li onClick={() => handleChangeMode(Number(selectedMode))}>
            <VscDebugRestart color="999" />
            <span>면접 재시작</span>
          </li>
          <li onClick={() => navigate(`/`)}>
            <IoHomeSharp color="999" />
            <span>처음 화면</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
