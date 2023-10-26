import React, { useEffect, useState } from 'react';
import styles from "./searchBlog.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBlog = () => {
    const [filters, setFilters] = useState({
        author: "",
        heading: "",
        place: "",
        fromDate: "",
        tillDate: "",
    });
    const [blogList, setBlogList] = useState([]);

    const getBlogs = async () => {
        const url = "http://localhost:5000/api/blog/fetchBlogList";
        const response = await axios.post(url, filters, {
            headers: {"Content-Type": "application/json"}
        });
        
        console.log(response.data.message);
        if(response.data.success === false) return;
        
        setBlogList(response.data.blogList);
    }

    useEffect(() =>  {
        getBlogs();
    }, [])

    return (
        <div>
            {/* apply filter */}
            <Filters filters={filters} setFilters={setFilters}/>
            <button onClick={() => getBlogs()}>Search</button>
            {/* display blogs based on filter */}
            <div className={styles["blog-list"]}>
                {blogList.length !== 0 && blogList.map((blog, index) => 
                    <Blog key={index} blog={blog}/>
                )}
            </div>
        </div>
    )
}

//filter component
const Filters = ({filters, setFilters}) => {
    const changeFilter = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return(
        <div className={styles["filters"]}>
            Author <input type='text' value={filters.author} onChange={e => changeFilter("author", e.target.value)}/>
            Title <input type='text' value={filters.heading} onChange={e => changeFilter("heading", e.target.value)}/>
            Place <input type='text' value={filters.place} onChange={e => changeFilter("place", e.target.value)}/>
            From <input type='date' value={filters.fromDate} onChange={e => changeFilter("fromDate", e.target.value)}/>
            Till <input type='date' value={filters.tillDate} onChange={e => changeFilter("tillDate", e.target.value)}/>
        </div>
    );
}

//bloglist component
const Blog = ({blog}) => {
    const navigate = useNavigate();
    return(
            <div 
                className={styles["blog"]}
                onClick={() => {
                    navigate(`/blog/view/${blog._id}`, {state:blog._id});
                }}
            >
                Heading : {blog.heading} <br/>
                Place : {blog.place}<br/>
                Author : {blog.author.fname} {blog.author.lname}<br/>
                Written on : {blog.createdDate}<br/>
                Likes : {blog.likes} Dislikes : {blog.dislikes}
            </div>
    )
}


export default SearchBlog;