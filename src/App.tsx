import { Routes, Route } from "react-router-dom";
import { Login } from './layouts/LoginRegister/Login';
import { Register } from "./layouts/LoginRegister/Register";
import { Home } from "./layouts/homepage/home";
import { NewPost } from "./layouts/NewPost/NewPost";
import { Details } from "./layouts/PostDetail/Details";

export const App = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/" element={<Home />} />
			<Route path="/new" element={<NewPost />} />
			<Route path="/detail" element={<Details />} />
		</Routes>
	)
}
