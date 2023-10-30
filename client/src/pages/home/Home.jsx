import Card from 'components/cards/Card';
import React from 'react';
import styles from "./home.module.css";
import img1 from "../../assets/home/1.jpg";
import img2 from "../../assets/home/2.jpg";
import img3 from "../../assets/home/3.jpg";
import img4 from "../../assets/home/4.jpg";

const Home = () => {
  return (
    <>
    <center>
    <h2>Top popular blogs</h2>  
    </center>
    <div className={styles["flex"]}>
      <Card image={img1} name="Bora Bora Island"/>
      <Card image={img2} name="Calangute Beach"/>
      <Card image={img3} name="Eiffel Tower"/>
      <Card image={img4} name="Japan"/>
    </div>
    </>
  )
}

export default Home;