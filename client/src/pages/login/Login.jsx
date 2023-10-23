import React, { useState } from 'react';
import styles from "./login.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const submitUserLogin = async (e) => {
		e.preventDefault();

		const user = {email, password};

		try{
			const url = "http://localhost:5000/api/account/login";
			const response = await axios.post(url, user, {
				headers:{
					"Content-Type": "application/json"
				},
				withCredentials : true
			});
			console.log(response.data.message);

			if(response.data.success === true) {
				setTimeout(() => {
					navigate("/");
				}, 1000);
			}
		} catch (error) {
			console.log("Error logging in. \nERROR : ",error.message);
		}
	}

	return (
		<div className={styles["login"]}>
			<form className={styles["login-form"]} onSubmit={submitUserLogin}>
				Email <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
				Password <input type='text' value={password} onChange={e => setPassword(e.target.value)}/>
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

export default Login