import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ViewBlog = () => {
    const location = useLocation();
    const blogId = location.state;

    const [metaData, setMetaData] = useState();
    const [contents, setContents] = useState();

    const getBlogData = async() => {
        const url = `http://localhost:5000/api/blog/fetchBlog/${blogId}`;
        const response = await axios.get(url);

        console.log(response.data.message);
        if(response.data.success === false) return;
        
        let blogData = response.data.blogData;
        blogData.contents.forEach((content) => {
            if(!content.isText) {
                content.image = `data:img/jpeg;base64,${content.image}`;
            }
        });
        setContents(blogData.contents);

        delete blogData.contents;
        setMetaData(blogData);
    }

    useEffect(() => {
        getBlogData();
    }, []);

    return (
        <div>
            {metaData ? 
                <> 
                    {metaData.authorName}<br/>
                    {metaData.createdDate}<br/>
                    {metaData.heading}<br/>
                    {metaData.place}<br/>
                    {contents.map((content, key) => 
                        content.isText ? 
                            <>
                                content.text<br/>
                            </>
                            :
                            <>
                                <img src={content.image} alt='blog'/><br/>
                            </>
                    )}
                    👍{metaData.likes} 👎{metaData.dislikes} <br/>
                    <input type='text' placeholder='Comment...'/>
                    {metaData.comments.map((comment, index) => {
                        <>
                            {comment.content}
                        </>
                    })}
                </>
                : 
                <>loading</> 
            }
        </div>
    )
}

export default ViewBlog;