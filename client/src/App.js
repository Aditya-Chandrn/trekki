import {Routes, Route} from "react-router-dom";

import './App.css';
import Login from 'pages/(auth)/login/Login';
import Signup from 'pages/(auth)/signup/Signup';
import Home from 'pages/home/Home';
import CreateBlog from 'pages/(blog)/createBlog/CreateBlog';
import Layout from "components/Layout";
import Profile from "pages/profile/Profile";
import Trial from "trial";
import SearchBlog from "pages/(blog)/searchBlog/searchBlog";
import ViewBlog from "pages/(blog)/viewBlog/ViewBlog";

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
					<Route path='search' element={<SearchBlog/>}/>
					<Route path="view/:id" element={<ViewBlog/>}/>
				</Route>
				{/* ------- other routes ------- */}
				<Route path='/' element={<Layout/>}>
					<Route index element={<Home/>}/>
					<Route path="profile" element={<Profile/>}/>
					<Route path="trial" element={<Trial/>}/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
