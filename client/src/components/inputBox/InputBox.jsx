import React from "react";
import styles from "./inputBox.module.css";

const TextInput = ({text, handleChange, index}) => {
    return(
        <div className={styles["text-input"]}>
            <textarea 
                className={styles["textarea"]}
                value={text}
                onChange={e => handleChange(e.target.value, index)}   
            />
        </div>
    );
};

const ImageInput = ({image, handleChange, index}) => {
    return(
        <div className={styles["image-input"]}>
            click
            {image?
                <>
                    <img 
                        className={styles["image"]}
                        src={URL.createObjectURL(image)}
                        alt="content"
                    />
                    <button onClick={() => handleChange(undefined, index)}>Remove</button>    
                </>
                :
                <input
                    type="file" 
                    className={styles["image"]}
                    value={image}
                    onChange={e => handleChange(e.target.files[0], index)}   
                />
            }
        </div>
    );
}

export {TextInput, ImageInput};