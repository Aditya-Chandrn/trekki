import React, { useEffect, useRef, useState } from "react";

import styles from "./createBlog.module.css";
import BlogCreation from "components/blogCreation/blogCreation";
import ContentManager from "components/contentManager/ContentManager";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
	const [currentContent, setCurrentContent] = useState();
	const [contents, setContents] = useState([]);
	const [heading, setHeading] = useState("");
	const [place, setPlace] = useState("");

	const navigate = useNavigate();

	//convert image to data buffer
	const convertToBuffer = (image) => {
		return new Promise((resolve, reject) => {
			let reader = new FileReader();

			reader.onload = (e) => {
				const buffer = e.target.result;
				resolve(buffer);
			};
			reader.onerror = (error) => {
				reject(error);
			}

			reader.readAsDataURL(image);
		});
	}

	//send blog to be created to server
	const submitBlog = async (e) => {
		e.preventDefault();

		//remove empty contents
		let filteredContents = [];
		await Promise.all(contents.map(async (content) => {
			if (content.isText && content.text.length > 0) {
				filteredContents.push(content);
			}
			else if (!content.isText && content.image !== undefined) {
				const base64Image = await convertToBuffer(content.image);
				filteredContents.push({ isText: false, image: base64Image });
			}
		}));

		const blogData = {
			heading: heading,
			place: place,
			contents: filteredContents
		}

		//post request
		try {
			const url = "http://localhost:5000/api/blog/create";
			const response = await axios.post(url, blogData, {
				headers: {
					"Content-Type": "application/json"
				},
				withCredentials: true
			});
			console.log(response.data.message);
		} catch (error) {
			console.error("Error creating blog. \nERROR", error.message);
		}
	}

	//handle any changes done to content input
	const handleChange = (isText, content, index) => {
		let allContents = [...contents];
		allContents[index] = isText ? {
			isText: isText,
			text: content
		} : {
			isText: isText,
			image: content
		}
		setContents(allContents);
	}

	//create new content input at correct position
	const createNewContent = (isText, index, direction) => {
		let allContents = [...contents];
		let newContent = isText ? {
			isText: isText,
			text: ""
		} : {
			isText: isText,
			image: undefined
		};
		allContents.splice(index + direction, 0, newContent);
		setContents(allContents);
	}

	//remove asked content from content list
	const removeContent = (index) => {
		let allContents = [...contents];
		allContents.splice(index, 1);
		setContents(allContents);
	}

	const getUser = async () => {
        const url = "http://localhost:5000/api/account/checkLogged";
        const response = await axios.get(url, {withCredentials: true});
        if (response.data.success === false) {
			console.log(response.data.message);
			navigate("/account/login");
		}
    }  

	const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [heading]);
	//if not logged in, redirect to login page
	useEffect(() => {
		getUser();
	}, [])

	return (
		<div className={styles["create-blog"]}>
			<form id="create-blog" className={styles["blog-form"]} onSubmit={submitBlog}>
				<textarea
					className={styles["heading"]}
					ref={textAreaRef}
					value={heading}
					placeholder="Title"
					onChange={e => setHeading(e.target.value)}
				/>
				<input
					className={styles["place"]}
					type="text"
					value={place}
					placeholder="Place"
					onChange={e => setPlace(e.target.value)}
				/>
				<BlogCreation
					contents={contents}
					setContents={setContents}
					setCurrentContent={setCurrentContent}
					createNewContent={createNewContent}
					handleChange={handleChange}
				/>
			<button id="create-blog" className={styles["create"]} type="submit">Create</button>
			</form>
			{contents.length !== 0 ?
				<ContentManager
					index={currentContent}
					removeContent={removeContent}
					createNewContent={createNewContent}
				/>
				:
				null
			}
		</div>
	);
}

export default CreateBlog;