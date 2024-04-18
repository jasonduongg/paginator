import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [numItems, setNumItems] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const data = {
    1: {date: "22.07.21", time: "16.02pm", file: "report 1"},
    2: {date: "23.07.21", time: "12.02pm", file: "report 2"},
    3: {date: "12.01.21", time: "24.00pm", file: "report 3"},
    4: {date: "22.07.21", time: "06.02pm", file: "report 4"}
  }
  const numDataEntries = Object.keys(data).length;
  const numPages = Math.ceil(numDataEntries / numItems);

  const setPage = (page) => {
    setCurrentPage(page);
  }

  const handleNumItemsChange = (event) => {
    setNumItems(Number(event.target.value));
    setCurrentPage(1); // Reset to page 1 after changing the number of items per page
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.pg_container}>

          <div className={styles.pg_nav}>
            <div className={styles.header_container}>
              <h3 className={styles.header}>Recently Generated Reports</h3>
            </div>

            <div className={styles.nav_buttons}>
              <button className={styles.nav_button}>F</button>
              <button className={styles.nav_button}>X</button>
            </div>
          </div>

          <div className={styles.pg_header}>
            <div className={styles.date_container}>
              <p className={styles.date}>Date</p>
            </div>
            <div className={styles.report_container}>
              <p className={styles.report}>Report Name</p>
            </div>
            <div className={styles.download_container}>
              <p className={styles.download}>Download</p>
            </div>
          </div>

          <div className={styles.pg_main}></div>

          <div className={styles.pg_footer}>
            {Array.from({ length: numPages }, (_, index) => (
              <button
                key={index + 1}
                className={styles.page_button}
                onClick={() => setPage(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <select value={numItems} onChange={handleNumItemsChange} className={styles.dropdown}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
      </main>
    </div>
  );
}
