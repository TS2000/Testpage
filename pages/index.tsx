import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TS Test site</title>
      </Head>
      <main className={styles.main}>
        <h4>TS Next Site :-)</h4>
      </main>
    </>
  );
};

export default Home;
