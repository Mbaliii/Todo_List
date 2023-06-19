import React, { useState } from 'react'
import './Todo.css'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addTodo } from './redux/todoSlice';

function Todo() {
	// const [value, setValue] = useState
	const [list, setList] = useState([
		{ id: 1, task: " ", done: false }
	])
	const [task, setTask] = useState('')
	const dispacth = useDispatch();

	// const onSubmit = (event) => {
	// 	event.preventDefault();
	// 	dispacth(addTodo({
	// 		title: value,
	// 	})
	// 	);
	// };


	return (
		
		<div className='container'>
			{/* <form onSubmit={onSubmit} className='form-inline mt-3 '/> */}
			<div className='inputPart'>
				<h2>YOUR TODO LIST :)</h2>
				<input type="text" placeholder="Add Task" onChange={e => setTask(e.target.value)} />
				<button className='addBtn' onClick={Add}>Add</button>
				{/* <Link className="btn btn-success" to={'/home'}>Home</Link> */}
			</div>
			<div className='taskList'>
				<ul>
					{list.map((l, i) => (
						<li>
							<span onClick={e => Update(l.id)} className={l.done ? "done" : ""}>{l.task}</span>
							<span onClick={e => Remove(l.id)}>X</span>
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
