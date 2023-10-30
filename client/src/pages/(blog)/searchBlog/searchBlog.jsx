import React, { useEffect, useState } from "react";
import styles from "./searchBlog.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      headers: { "Content-Type": "application/json" },
    });

    console.log(response.data.message);
    if (response.data.success === false) return;

    setBlogList(response.data.blogList);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className={styles["flex"]}>
      {/* apply filter */}
      <div className={styles["flex"]}>
        <Filters filters={filters} setFilters={setFilters} getBlogs={getBlogs} />
      </div>
      {/* display blogs based on filter */}
      <div className={styles["blog-list"]}>
        {blogList.length !== 0 &&
          blogList.map((blog, index) => <Blog key={index} blog={blog} />)}
      </div>
    </div>
  );
};

//filter component
const Filters = ({ filters, setFilters, getBlogs }) => {
  const changeFilter = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={styles["nav"]}>
          Author{" "}
          <br />
          <input
            type="text"
            value={filters.author}
            onChange={(e) => changeFilter("author", e.target.value)}
          />
          <br />
          Title{" "}
          <br />
          <input
            type="text"
            value={filters.heading}
            onChange={(e) => changeFilter("heading", e.target.value)}
          />
          <br />
          Place{" "}
          <br />
          <input
            type="text"
            value={filters.place}
            onChange={(e) => changeFilter("place", e.target.value)}
          />
          <br />
          From{" "}
          <br />
          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) => changeFilter("fromDate", e.target.value)}
          />
          <br />
          Till{" "}
          <br />
          <input
            type="date"
            value={filters.tillDate}
            onChange={(e) => changeFilter("tillDate", e.target.value)}
          />
          <br />
        <button className={styles["search"]} onClick={() => getBlogs()}>Search</button>

    </div>

  );
};

//bloglist component
const Blog = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles["blog"]}
      onClick={() => {
        navigate(`/blog/view/${blog._id}`, { state: blog._id });
      }}
    >
      Heading : {blog.heading} <br />
      Place : {blog.place}
      <br />
      Author : {blog.author.fname} {blog.author.lname}
      <br />
      Written on : {blog.createdDate}
      <br />
      Likes : {blog.likes} Dislikes : {blog.dislikes}
    </div>
  );
};

export default SearchBlog;
