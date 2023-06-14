import React, { useState } from 'react'
import './Todo.css'
import { Link } from "react-router-dom";

function Todo() {
	const [list, setList] = useState([
		{ id: 1, task: "Take out the trash", done: false }
	])
	const [task, setTask] = useState('')
	return (
		<div className='container'>
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
							<span onClick={e => Remove(l.id)}>x</span>
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

	function Remove(id){
		const newList = list.filter (f => f.id !== id);
		setList(newList);
	}
}

export default Todo; 
