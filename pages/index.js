import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [numItems, setNumItems] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const data = {
  }

  const renderDataForCurrentPage = () => {
    const startIndex = (currentPage - 1) * numItems;
    const endIndex = Math.min(startIndex + numItems, numDataEntries);
    const renderedData = [];

    for (let i = startIndex + 1; i <= endIndex; i++) {
      const item = data[i];
      renderedData.push(
        <div>
          <div className={styles.data_row} key={i}>
            <div className={styles.meta_container}>
              <p className={styles.date}>{item.date}</p>
              <p className={styles.time}>{item.time}</p>
            </div>
            <div className={styles.report_container}>
              <p className={styles.report}>{item.file}</p>
            </div>
            <div className={styles.download_container}>
              <button className={styles.downloadButton}>Download</button>
            </div>
          </div>
        </div>
       
        
      );
    }

    return renderedData;
  };


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function getRandomDate() {
    const year = getRandomInt(2000, 2022);
    const month = getRandomInt(1, 12);
    const day = getRandomInt(1, 28); 
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  }
  
  function getRandomTime() {
    const hours = getRandomInt(0, 23);
    const minutes = getRandomInt(0, 59);
    const ampm = hours < 12 ? 'AM' : 'PM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  }

  let index = Object.keys(data).length + 1;
  while (index <= 24) {
    const randomDate = getRandomDate();
    const randomTime = getRandomTime();
    data[index] = {
      date: randomDate,
      time: randomTime,
      file: `report ${index}`
    };
    index++;
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
    <div className='body'>

  
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
              <button className={styles.nav_button}>
              <Image
                className='button-icon'
                src="/icons/Filter.png" 
                width={15}
                height={15}
                
              />
              </button>
              <button className={styles.nav_button}>
              <Image
                className='button-icon'
                src="/icons/Close.png" 
                width={15}
                height={15}
                
              />
              </button>
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

          <div className={styles.pg_main}>
            <div className={styles.data_container}>
              {renderDataForCurrentPage()}
            </div>
          </div>

          <div className={styles.pg_footer}>
            <div className={styles.page_button_container}>
              <button onClick={() => setPage(currentPage - 1)}> Prev </button>
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
              <button onClick={() => setPage(currentPage + 1)}> Next </button>
            </div>
            <select value={numItems} onChange={handleNumItemsChange} className={styles.dropdown}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}
