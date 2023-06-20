import React, { useState } from 'react'
import './Todo.css'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/main.css";

function Todo() {
	const [list, setList] = useState([
		{ id: 1, task: " ", done: false }
	])
	const [task, setTask] = useState('')

	const navigate = useNavigate();


	const IsValidate = () => {
		let isproceed = true;
		let errormessage = 'Please enter any-task';
		if (task === null || task === '') {
			isproceed = false;
			errormessage += ' Todo';
		}
		if (!isproceed) {
			toast.warning(errormessage)
		} else {
			if (/^[A-z][A-z0-9-_]{3,23}$/.test(task)) {
			} else {
				isproceed = false;
				toast.warning('Please enter a task')
			}
		}

		return isproceed

	}
	const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { task };
        if (IsValidate()) {
            //console.log(regobj);
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }

	// const handlesubmit = (e) => {
	// 	e.preventDefault();
	// 	let regobj = {task};
	// 	if (IsValidate()) {
	// 		fetch("http://localhost:3000/users", {
	// 			method: "POST",
	// 			headers: { 'content-type': 'application/json' },
	// 			body: JSON.stringify(regobj)
	// 		}).then((res) => {
	// 			toast.success('Task created.')
	// 			navigate('/todolist');
	// 		}).catch((err) => {
	// 			toast.error('Failed : ' + err.message);
	// 		})

	// 	}
	// }



	return (

		<div className='container'>
			<form className='form-inline mt-3' onSubmit={handlesubmit}></form>
			<div className='inputPart'>
				<h2>YOUR TODO LIST :)</h2>
				<input type="text" placeholder="Add Task" onChange={e => setTask(e.target.value)} />
				<button className='addBtn' onClick={Add}>Add</button>

			</div>

			<div className='taskList'>
				<ul>
					{list.map((l, i) => (
						<li>
							<span onClick={e => Update(l.id)} className={l.done ? "done" : ""}>{l.task}</span>
							<span onClick={e => Remove(l.id)}> X </span>
						</li>
					))}
				</ul>
				<Link className="btn btn-success" to={'/home'}>Home</Link>

			</div>
		</div >
	)
	function Add() {
		const newObj = { id: 2, task: task, done: false }
		setList(prevList => prevList.concat(newObj))
	}

	function Update(id) {
		const newList = list.map((l, i) => (
			l.id === id ? { ...l, done: true } : l
		))
		setList(newList);
	}

	function Remove(id) {
		const newList = list.filter(f => f.id !== id);
		setList(newList);
	}
}

export default Todo;

