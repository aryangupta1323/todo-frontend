import styles from "./form.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtActions, signActions, logActions } from "../store/index";
import Header from "./Header";
const backend_url = process.env.REACT_APP_BACKEND_URL;
const Login = ({ setItems }) => {
	const dispatch = useDispatch();
	const [emailVal, setEmail] = useState("");
	const [passwordVal, setPassword] = useState("");
	const [isLogged, setLogin] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	useEffect(() => {
		if (isLogged) {
			fetch(`${backend_url}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: emailVal,
					password: passwordVal,
				}),
			})
				.then((res) => {
					setEmail("");
					setPassword("");
					return res.json();
				})
				.then((res) => {
					console.log(res);
					const error = res.error;
					const jwt = res.jwt;
					if (res.items) setItems(res.items);
					if (error === null) {
						localStorage.setItem("jwt", jwt);
						setTimeout(() => {
							dispatch(jwtActions.set(jwt));
						});
						setSuccess(res.message);
					}
					if (error === true) {
						setError(res.message);
						setLogin(false);
					}
				});
		}
	}, [isLogged]);
	function changeEmail(e) {
		setEmail(e.target.value);
	}
	function changePassword(e) {
		setPassword(e.target.value);
	}
	function formSubmit(e) {
		e.preventDefault();
		setLogin(true);
		console.log(emailVal + " " + passwordVal);
	}
	function signClickHandler() {
		dispatch(jwtActions.unset());
		dispatch(signActions.set());
		dispatch(logActions.unset());
	}
	return (
		<>
			<Header />
			<div className={styles.background}>
				<div className={styles.shape}></div>
				<div className={styles.shape}></div>
			</div>
			<form onSubmit={formSubmit}>
				<h3>Login</h3>
				{error.length > 0 ? <p className={styles.error}>{error}</p> : ""}
				{success.length > 0 ? <p className={styles.success}>{success}</p> : ""}
				<label for="username">Username</label>
				<input
					type="text"
					placeholder="Email or Phone"
					id="username"
					name="email"
					value={emailVal}
					onChange={changeEmail}
				/>
				<label for="password">Password</label>
				<input
					type="password"
					placeholder="Password"
					id="password"
					name="password"
					value={passwordVal}
					onChange={changePassword}
				/>
				<button type="submit">Log In</button>
				<p className={styles["sign-toggler"]}>
					New User?{" "}
					<a href="#" onClick={signClickHandler}>
						sign in
					</a>
				</p>
				{/* <div class="social">
					<div class="go">
						<i class="fab fa-google"></i> Google
					</div>
					<div class="fb">
						<i class="fab fa-facebook"></i> Facebook
					</div>
				</div> */}
			</form>
		</>
	);
};

export default Login;
