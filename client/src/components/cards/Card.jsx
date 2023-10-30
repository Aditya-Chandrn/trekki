import React from 'react'
import styles from "./card.module.css";

const Card = (props) => {
  return (
    <div className={styles["tile"]}>
        <img src={props.image} alt="hello"  className={styles["image"]} />
        <center>
            <h3>{props.name}</h3>
        </center>

    </div>
  )
}

export default Card
