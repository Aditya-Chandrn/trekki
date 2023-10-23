import React, { useState } from 'react';
import styles from "./signup.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const [email, setEmail] = useState("");
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const submitNewUser = async (e) => {
		e.preventDefault();

		if(password !== confirmPassword){
			console.log("Both passwords should be equal.");
			return;
		}

		const newUser = {
			email, fname, lname, password
		}

		try{
			const url = "http://localhost:5000/api/account/signup";
			const response = await axios.post(url, newUser, {
				header: {
					"Content-Type" : "application/json"
				},
				withCredentials : true
			});
			console.log(response.data.message);

			if(response.data.success === true) {
				setTimeout(()=> {
					navigate("/");
				},1000);
			}

		} catch (error) {
			console.error("Error creating account. \nERROR : ", error.message);
		}
	}


	return (
		<div className={styles["signup"]}>
			<form className={styles["signup-form"]} onSubmit={submitNewUser}>
				Fname <input type='text' value={fname} onChange={e => setFname(e.target.value)}/>
				Lname <input type='text' value={lname} onChange={e => setLname(e.target.value)}/>
				Email <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
				Password <input type='text' value={password} onChange={e => setPassword(e.target.value)}/>
				Confirm Password <input type='text' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
				<button type='submit'>Submit</button>
			</form>
    </div>
	)
}

export default Signup