import styles from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signActions, logActions, jwtActions } from "../store/index";
const Header = () => {
	const dispatch = useDispatch();
	const jwt = useSelector((state) => state.jwt.value);

	const logoutClick = () => {
		dispatch(logActions.unset());
		localStorage.removeItem("jwt");
		dispatch(jwtActions.unset());
		dispatch(signActions.set());
	};
	const loginClick = () => {
		dispatch(signActions.unset());
		dispatch(logActions.set());
	};
	var button;
	if (jwt) button = <button onClick={logoutClick}>Logout</button>;
	else button = <button onClick={loginClick}> Login </button>;

	return (
		<>
			<div className={styles["navbar-btn"]}>
				<img src="logo.png" alt="Todolist Logo"></img>
				<h1>TodoList</h1>
				{button}
			</div>
		</>
	);
};

export default Header;
