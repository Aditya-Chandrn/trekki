import React, { useEffect, useRef, useState } from 'react';
import styles from "./navbar.module.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import DefaultUser from "assets/default_user.png";

const UserButton = ({userData, setIsLogged}) => {
    const [image, setImage] = useState();
    const [clicked, setClicked] = useState(false);
    const buttonRef = useRef(null);

    const navigate = useNavigate();

    //logout
    const logout = async () => {
        const url = "http://localhost:5000/api/account/logout";
        const response = await axios.get(url, {withCredentials: true});
        console.log(response.data.message);
        
        setTimeout(() => {
            setIsLogged(false);
            navigate("/");
        }, 1000);
    }

    const handleOutsideClick = (e) => {
        if(buttonRef.current && !buttonRef.current.contains(e.target)){
            setClicked(false);
        }
    }

    useEffect(() => {
        userData.image && setImage(`data:img/jpeg;base64,${userData.image}`);
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }
    }, [userData]);

    return(
        <div className={styles["user"]}>
            <button className={styles["profile"]} onClick={() => setClicked(!clicked)} ref={buttonRef}>
                {userData.fname} 
                <img 
                    className={styles[image? "user-image" : "default-user"]} 
                    src={image ? image : DefaultUser} 
                    alt={userData.email}
                /> 
            </button>
            {clicked ?
                <div className={styles["dropdown"]}>
                    <Link className={styles["dropdown-option"]} to="/profile">Profile</Link>
                    <button className={styles["dropdown-option"]} onClick={() => logout()}>
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
            <div className={styles["navbar-options"]}>
                <Link to="/">Stories</Link>
                <Link to="/blog/search">Search</Link>
                <Link to="/blog/create">Write Blog</Link>
            </div>
            <div className={styles["login-button"]}>
                {isLogged? 
                    <UserButton userData = {user} setIsLogged={setIsLogged}/>
                    :
                    <Link to="/account/login">Login</Link>
                }
            </div>
            
    </div>
    )
}

export default Navbar;