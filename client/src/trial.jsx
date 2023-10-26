import axios from 'axios';
import React, { useState } from 'react'

const Trial = () => {
    const [image, setImage] = useState();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("image", image);
        console.log(formData);

        const url = "http://localhost:5000/api/account/banana";
        const response = await axios.post(url ,formData, {headers : {"Content-Type": "multipart/form-data"}});
        console.log(response.data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='file' onChange={e => setImage(e.target.files[0])}/>
            <button type='submit'>Click</button>
        </form>
    )
}

export default Trial