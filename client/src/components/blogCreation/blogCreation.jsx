import React from 'react';

import { ImageInput, TextInput } from 'components/inputBox/InputBox';
import styles from "./blogCreation.module.css";

const BlogCreation = ({setCurrentContent, contents, handleChange, createNewContent}) => {
	return (
		<div className={styles["blog-creation"]}>
			{contents.map((content, index) => 
				<div 
                    key={index}
                    onClick={() => setCurrentContent(index)}
                >
				{content.isText ? 
					<TextInput 
						key={index}
						text={content.text}
						handleChange={(newText) => handleChange(true, newText, index)}
						index={index}
                        onClick={() => setCurrentContent(index)}
					/>
					:
					<ImageInput 
						key={index}
						image={content.image}
						handleChange={(newImage) => handleChange(false, newImage, index)}
						index={index}
					/>
				}	
				</div>
			)}

            {contents.length === 0 ? 
               <div className={styles["add-buttons"]}>
                    <button 
                        className={styles["add"]}
                        onClick={() => {
                            createNewContent(true, 0, 0);
                            setCurrentContent(0);
                        }}
                    >
                    Add Text
                    </button>
                    <button 
                        className={styles["add"]}
                        onClick={() => {
                            createNewContent(false, 0, 0);
                            setCurrentContent(0);
                        }}
                    >
                    Add Image
                    </button>
                </div> 
                :
                null
            }
			
		</div>
	)
}

export default BlogCreation;