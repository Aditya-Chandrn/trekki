import React, { useEffect, useRef } from "react";
import styles from "./inputBox.module.css";

const TextInput = ({text, handleChange, index}) => {
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return(
        <textarea 
            className={styles["text-input"]}
            ref={textAreaRef}
            value={text}
            placeholder="Write your story"
            onChange={e => handleChange(e.target.value, index)}   
        />
    );
};

const ImageInput = ({image, handleChange, index}) => {
    const imageClass = image ? "image-exists" : "no-image";
    return(
        <div tabIndex="0" className={styles["image-input"]}>
            {image?
                <>
                    <img 
                        className={styles[imageClass]}
                        accept=".jpg .jpgeg .png .avif .gif"
                        src={URL.createObjectURL(image)}
                        alt="content"
                    />
                    <button className={styles["remove"]} onClick={() => handleChange(undefined, index)}>❌</button>    
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