import Login from "./components/Login.js";
import SignUp from "./components/Signup.js";
import TodoList from "./components/TodoList.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

function App() {
	//const showLogin = useSelector((state) => state.showLogin);
	const [items, setItems] = useState([]);
	const signup = useSelector((state) => state.signup.isValid);
	const login = useSelector((state) => state.login.isValid);
	const jwt = useSelector((state) => state.jwt.value || "");
	console.log(jwt);
	var toShow;
	if (jwt.length > 0) toShow = <TodoList items={items} setItems={setItems} />;
	else if (login) toShow = <Login setItems={setItems} />;
	else if (signup) toShow = <SignUp />;

	return <>{toShow}</>;
}

export default App;
