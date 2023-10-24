import React, { useEffect, useRef, useState } from 'react';
import styles from "./navbar.module.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserButton = ({userData, setIsLogged}) => {
    const [image, setImage] = useState();
    const [clicked, setClicked] = useState(false);
    const buttonRef = useRef(null);

    const navigate = useNavigate();

    const logout = async () => {
        const url = "http://localhost:5000/api/account/logout";
        const response = await axios.get(url, {withCredentials: true});
        console.log(response.data.message);
        
        setTimeout(() => {
            setIsLogged(false);
            navigate("/");
        }, 1000);
    }

    const convertBufferToImage = () => {
        const buffer = new Uint8Array(userData.image);
        const blob = new Blob([buffer], {type: "image/jpeg"});
        setImage(URL.createObjectURL(blob));
    }

    const handleOutsideClick = (e) => {
        if(buttonRef.current && !buttonRef.current.contains(e.target)){
            setClicked(false);
        }
    }

    useEffect(() => {
        convertBufferToImage();
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }
    }, [userData]);

    return(
        <div className={styles["user"]}>
            <button onClick={() => setClicked(!clicked)} ref={buttonRef}>
                <img className={styles["user-image"]} src={image} alt={userData.email}/>
            </button>
            {clicked ?
                <div className={styles["dropdown"]}>
                    <button>
                        <Link to="/profile">Profile</Link>
                    </button>
                    <button onClick={() => logout()}>
                        Logout
                    </button>
                </div>
                :
                null
            }
        </div>
    )
}

const Navbar = () => {
    const [user, setUser] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    const getUser = async () => {
        const url = "http://localhost:5000/api/account/checkLogged";
        const response = await axios.get(url, {withCredentials: true});
        if(response.data.userData){
            setUser(response.data.userData);
            setIsLogged(true);
        }
    }   

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className={styles["navbar"]}>
            <Link to="/">Stories</Link>
            <Link to="/blog/create">Write Blog</Link>
            {isLogged? 
                <UserButton userData = {user} setIsLogged={setIsLogged}/>
                :
                <Link to="/account/login">Login</Link>
            }
            
    </div>
    )
}

export default Navbar;