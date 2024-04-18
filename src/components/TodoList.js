import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import styles from "./TodoList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { jwtActions, logActions } from "../store";
function TodoList({ items, setItems }) {
	const [inputValue, setInputValue] = useState("");
	const [editIndex, setEditIndex] = useState(-1);
	const jwt = useSelector((state) => state.jwt.value);
	const dispatch = useDispatch();
	useEffect(() => {
		let isMounted = true;
		fetch("https://todo-backend-wvwp.onrender.com/auth/load", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.error) {
					dispatch(jwtActions.unset());
					dispatch(logActions.set());
				}
				if (data.items) setItems(data.items);
			})
			.catch((err) => {
				console.log(err);
			});
		return () => {
			isMounted = false; // Set isMounted to false when component unmounts to prevent state update on unmounted component
		};
	}, []);
	useEffect(() => {
		if (items.length === 0) return;
		fetch("https://todo-backend-wvwp.onrender.com/auth/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify({ items: items }),
		})
			.then((res) => {})
			.catch((err) => console.log(err));
	}, [items]);
	const handleAddOrUpdateItem = () => {
		if (inputValue.trim() === "") return;
		if (editIndex > -1) {
			const updatedItems = items.map((item, index) => {
				if (index === editIndex) {
					return inputValue;
				}
				return item;
			});
			setItems(updatedItems);
			setEditIndex(-1);
		} else {
			setItems([...items, inputValue]);
		}
		setInputValue("");
	};

	const handleEditItem = (index) => {
		setInputValue(items[index]);
		setEditIndex(index);
	};

	const handleDeleteItem = (index) => {
		const newItems = items.filter((_, i) => i !== index);
		setItems(newItems);
		if (index === editIndex) {
			setInputValue("");
			setEditIndex(-1);
		}
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleAddOrUpdateItem();
		}
	};

	return (
		<>
			<Header />
			<div className={styles["todo-list"]}>
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
					placeholder="Add a new task or update selected..."
					className={editIndex > -1 ? styles.editing : ""}
				/>
				<button
					onClick={handleAddOrUpdateItem}
					className={editIndex > -1 ? styles["save-btn"] : styles["add-btn"]}
				>
					<i className={editIndex > -1 ? "fas fa-save" : "fas fa-plus"}></i>
				</button>
				<ul>
					{items.map((item, index) => (
						<li
							key={index}
							className={index === editIndex ? styles.editing : ""}
						>
							{item}
							<div className={styles["edit-del"]}>
								<button
									onClick={() => handleEditItem(index)}
									className={styles["edit-btn"]}
								>
									<i className="fas fa-edit"></i>
								</button>
								<button
									onClick={() => handleDeleteItem(index)}
									className={styles["delete-btn"]}
								>
									<i className="fas fa-trash"></i>
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default TodoList;
