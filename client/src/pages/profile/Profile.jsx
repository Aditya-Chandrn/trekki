import React, { useEffect, useState } from 'react';
import styles from "./profile.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Input = ({value, setValue, placeHolder, setAskCP=null, askCP=false}) => {
    const [disabled, setDisabled] = useState(true);
    const [changeData, setChangeData] = useState("✏️");

    const handleClick = () => {
        setDisabled(!disabled);
        changeData === "✏️" ? setChangeData("✅") : setChangeData("✏️");
        if(placeHolder === "********") setAskCP(true);
    }

    return(
        <div className={styles["input"]}>
            <input 
                type='text' 
                value={value} 
                onChange={e => setValue(e.target.value)} 
                placeholder={placeHolder}
                disabled={disabled}
            />
            <button 
                type='button'
                onClick={() => handleClick()}
            >{changeData}</button>
        </div>
        
    )
}

const Profile = () => {
    const [image, setImage] = useState();
    const [email, setEmail] = useState("");
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const [askCP, setAskCP] = useState(false);
    const navigate = useNavigate();

    const changeUserData = (e) => {
        e.preventDefault();
        if(!window.confirm("Do you confirm these changes.")){
            return;
        }

        if(password !== confirmPassword){
            alert("Both password should be same.");
            return;
        }

        
    }

    const convertBufferToImage = (imageBuffer) => {
        const blob = new Blob([imageBuffer], {type: "image/jpeg"});
        const imageUrl = URL.createObjectURL(blob);
        const image = new Image();
        return imageUrl;
    }

    const getUser = async () => {
        const url = "http://localhost:5000/api/account/checkLogged";
        const response = await axios.get(url, {withCredentials: true});
        if(response.data.userData){
            const {image, fname, lname, email} = response.data.userData;

            setImage(convertBufferToImage(image));
            setFname(fname);
            setLname(lname);
            setEmail(email);
        }
        else navigate("/");
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className={styles["profile"]}>
            <form className={styles["profile-form"]} onSubmit={changeUserData}>
                <img src={image} alt='user'/>
                <Input value={fname} setValue={setFname}/>
                <Input value={lname} setValue={setLname}/>
                <Input value={email} setValue={setEmail}/>
                <Input value={password} setValue={setPassword} placeHolder="********" setAskCP={setAskCP} askCP={askCP}/>
                {askCP ?
                    <input type='text' value={confirmPassword} setValue={setConfirmPassword}/>
                    :
                    null
                }
        
                <button type="submit">Change</button>
            </form>
        </div>
    )
}

export default Profile;