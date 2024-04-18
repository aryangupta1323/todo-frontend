import styles from "./form.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import { signActions, logActions } from "../store/index";
const backend_url = process.env.BACKEND_URL;
const SignUp = () => {
	const dispatch = useDispatch();
	const [emailVal, setEmail] = useState("");
	const [passwordVal, setPassword] = useState("");
	const [signUp, setSignUp] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	useEffect(() => {
		if (signUp) {
			fetch(`https://todo-backend-wvwp.onrender.com/auth/signup`, {
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
					const error = res.error;
					if (error === null) {
						setSuccess(res.message);
						setTimeout(() => {
							dispatch(signActions.unset());
							dispatch(logActions.set());
						}, 2000);
					}
					if (error === true) {
						setError(res.message);
						setSignUp(false);
					}
				});
		}
	}, [signUp]);
	function changeEmail(e) {
		setEmail(e.target.value);
	}
	function changePassword(e) {
		setPassword(e.target.value);
	}
	function formSubmit(e) {
		e.preventDefault();
		setSignUp(true);
		console.log(emailVal + " " + passwordVal);
	}
	return (
		<>
			<Header />
			<div className={styles.background}>
				<div className={styles.shape}></div>
				<div className={styles.shape}></div>
			</div>
			<form onSubmit={formSubmit}>
				<h3>Sign In</h3>
				{error.length > 0 ? <p className={styles.error}>{error}</p> : ""}
				{success.length > 0 ? <p className={styles.success}>{success}</p> : ""}
				<label for="username">Username</label>
				<input
					type="email"
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
				<button type="submit">Sign Up</button>

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

export default SignUp;
