import React from "react";
import styles from "./contentManager.module.css";

const ContentManager = ({index, removeContent, createNewContent}) => {
    const options = [{
            label: "Remove",
            function: () => removeContent(index)
        }, {
            label: "Add Text Above",
            function: () => createNewContent(true, index, 0)
        }, {
            label: "Add Text Below",
            function: () => createNewContent(true, index, 1)
        },{
            label: "Add Image Above",
            function: () => createNewContent(false, index, 0)
        },{
            label: "Add Image Below",
            function: () => createNewContent(false, index, 1)
        }
    ];

    return(
        <div className={styles["content-managaer"]}>
            {options.map((option, index) => 
                <button 
                    key={index} 
                    onClick={option.function}
                >
                    {option.label}
                </button>
            )}
        </div>
    )
}

export default ContentManager;