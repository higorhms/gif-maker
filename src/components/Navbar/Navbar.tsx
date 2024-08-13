import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Navbar.module.scss";
import { RiHome2Line, RiImage2Line, RiFileGifLine } from "react-icons/ri";

export default function Navbar() {
  const router = useRouter();

  return (
    <div>
      <div className={styles.container}>
        <img className={styles.logo} src="https://github.com/higorhms/GoBarber/assets/44821959/0c80ef6f-fa43-4160-87cb-8ef11dc93f5f" alt="logo" />
        <Link href="/" className={router.pathname == "/" ? styles.activeLink : styles.item}>
          <RiHome2Line className={styles.icon} />
          <span className={styles.text}>Home</span>
        </Link>
        <Link href="/grayscale" className={router.pathname == "/grayscale" ? styles.activeLink : styles.item}>
          <RiImage2Line className={styles.icon} />
          <span className={styles.text}>Grayscale</span>
        </Link>
        <Link href="/gif-maker" className={router.pathname == "/gif-maker" ? styles.activeLink : styles.item} >
          <RiFileGifLine className={styles.icon} />
          <span className={styles.text}>GIF Maker</span>
        </Link>
      </div>
      <div className={styles.leftColorSeparator}></div>
      <div className={styles.rightColorSeparator}></div>
    </div >
  );
}
