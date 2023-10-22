import {Routes, Route} from "react-router-dom";

import './App.css';
import Login from 'pages/login/Login';
import Signup from 'pages/signup/Signup';
import Home from 'pages/home/Home';
import CreateBlog from 'pages/createBlog/CreateBlog';

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
				<Route path='/blog'>
					<Route path='create' element={<CreateBlog/>}/>
				</Route>
				{/* ------- other routes ------- */}
				<Route path='/'>
					<Route index element={<Home/>}/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
