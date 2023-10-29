import React from "react";
import styles from "./contentManager.module.css";

const ContentManager = ({index, removeContent, createNewContent}) => {
    const options = [{
            label: "📝↑",
            function: () => createNewContent(true, index, 0)
        }, {
            label: "📝↓",
            function: () => createNewContent(true, index, 1)
        },{
            label: "🖼️↑",
            function: () => createNewContent(false, index, 0)
        },{
            label: "🖼️↓",
            function: () => createNewContent(false, index, 1)
        }, {
            label: "❌",
            function: () => removeContent(index)
        } 
    ];

    return(
        <div className={styles["content-manager"]}>
            {options.map((option, index) => 
                <button 
                    className={styles["contents-option"]}
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