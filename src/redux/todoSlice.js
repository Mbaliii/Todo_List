import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


const Todolist = () => {
    const todos = useSelector((state)=> state.todos);
}



const todoSlice = createSlice(
    
    {
        
        name: "todos",
        initialState: [
            {
                id: 1, title: "todo1", complete: false
            },
            { id: 2, title: "todo2", complete: false },
            { id: 3, title: "todo3", complete: true },
        ],
        reducers: {
            addTodo: (state, action) => {
                const newTodo = {
                    id: Date.now(),
                    title: action.payload.title,
                    completed: false
                };
                state.push(newTodo);
            }
        }
    });

export const {addTodo } = todoSlice.actions;
export default todoSlice.reducer;