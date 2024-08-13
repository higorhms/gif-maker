import Head from "next/head";
import Link from "next/link";

import Navbar from "@/components/Navbar/Navbar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gif Maker</title>
        <meta
          name="description"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.body}>
          <h1 className={styles.header}>
            Think of an awesome home title. &nbsp;
            <Link target="_blank" href="https://www.linkedin.com/in/higormartinsdasilva/">
              Higor Martins
            </Link></h1>
          <div className={styles.content}>
          </div>
        </div>
      </main>
    </>
  );
}
