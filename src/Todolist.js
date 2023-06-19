import React, { useState } from 'react'
import './Todo.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import todoSlice, { addTodo } from './redux/todoSlice';
import { toast } from "react-toastify";

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

	// const navigate = useNavigate();

	const IsValidate = () => {
		let isproceed = true;
        let errormessage = 'Please enter any-task';
        if (Todo === null || Todo === '') {
            isproceed = false;
            errormessage += ' Todo';
        }
	}

	const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = {};
        if (IsValidate()) {
            //console.log(regobj);
            fetch("http://localhost:3000/work", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Task created.')
                // navigate('/todolist');
            })
			// .catch((err) => {
            //     toast.error('Failed :' + err.message);
            // });
        }
    }



	return (
		
		<div className='container'>
			<form className='form-inline mt-3' onSubmit={handlesubmit}/>
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
