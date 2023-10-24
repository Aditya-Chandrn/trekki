import {Routes, Route} from "react-router-dom";

import './App.css';
import Login from 'pages/login/Login';
import Signup from 'pages/signup/Signup';
import Home from 'pages/home/Home';
import CreateBlog from 'pages/createBlog/CreateBlog';
import Layout from "components/Layout";
import Profile from "pages/profile/Profile";

function App() {
	return (
		<div className="App">
			<Routes>
				{/* ------- auth routes ------- */}
				<Route path='/account'>
					<Route path='login' element={<Login/>}/>
					<Route path='signup' element={<Signup/>}/>
				</Route>
				{/* ------- blog routes ------- */}
				<Route path='/blog' element={<Layout/>}>
					<Route path='create' element={<CreateBlog/>}/>
				</Route>
				{/* ------- other routes ------- */}
				<Route path='/' element={<Layout/>}>
					<Route index element={<Home/>}/>
					<Route path="profile" element={<Profile/>}/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
