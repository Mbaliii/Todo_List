
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Login = () => {
//     const [email, emailupdate] = useState('');
//     const [password, passwordupdate] = useState('');

//     const usenavigate=useNavigate();

//     useEffect(()=>{
// sessionStorage.clear();
//     },[]);

//     const ProceedLogin = (e) => {
//         e.preventDefault();
//         if (validate()) {
//             fetch("http://localhost:3000/users/" + email).then((res) => {
//                 return res.json();
//             }).then((resp) => {

//                 if (Object.keys(resp).length === 0) {
//                     toast.error('Please Enter valid email');
//                 } else {
//                     if (resp.password === password) {
//                         toast.success('Success');
//                         sessionStorage.setItem('email',email);
//                         sessionStorage.setItem('userrole',resp.role);
//                         usenavigate('/')
//                     }else{
//                         toast.error('Please Enter valid credentials');
//                     }
//                 }
//             }).catch((err) => {
//                 toast.error('Login Failed due to :' + err.message);
//             });
//         }
//     }

//     const ProceedLoginusingAPI = (e) => {
//         e.preventDefault();
//         if (validate()) {
//             ///implentation
//             // console.log('proceed');
//             let inputobj={"email": email,
//             "password": password};
//             fetch("https://localhost:44308/User/Authenticate",{
//                 method:'POST',
//                 headers:{'content-type':'application/json'},
//                 body:JSON.stringify(inputobj)
//             }).then((res) => {
//                 return res.json();
//             }).then((resp) => {
//                 console.log(resp)
//                 if (Object.keys(resp).length === 0) {
//                     toast.error('Login failed, invalid credentials');
//                 }else{
//                      toast.success('Success');
//                      sessionStorage.setItem('email',email);
//                      sessionStorage.setItem('jwttoken',resp.jwtToken);
//                    usenavigate('/')
//                 }
//                 // if (Object.keys(resp).length === 0) {
//                 //     toast.error('Please Enter valid email');
//                 // } else {
//                 //     if (resp.password === password) {
//                 //         toast.success('Success');
//                 //         sessionStorage.setItem('email',email);
//                 //         usenavigate('/')
//                 //     }else{
//                 //         toast.error('Please Enter valid credentials');
//                 //     }
//                 // }
//             }).catch((err) => {
//                 toast.error('Login Failed due to :' + err.message);
//             });
//         }
//     }
//     const validate = () => {
//         let result = true;
//         if (email === '' || email === null) {
//             result = false;
//             toast.warning('Please Enter email');
//         }
//         if (password === '' || password === null) {
//             result = false;
//             toast.warning('Please Enter Password');
//         }
//         return result;
//     }
//     return (
//         <div className="row">
//             <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
//                 <form onSubmit={ProceedLogin} className="container">
//                     <div className="card">
//                         <div className="card-header">
//                             <h2>User Login</h2>
//                         </div>
//                         <div className="card-body">
//                             <div className="form-group">
//                                 <label>email<span className="errmsg">*</span></label>
//                                 <input value={email} onChange={e => emailupdate(e.target.value)} className="form-control"></input>
//                             </div>
//                             <div className="form-group">
//                                 <label>Password <span className="errmsg">*</span></label>
//                                 <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
//                             </div>
//                         </div>
//                         <div className="card-footer">
//                             <button type="submit" className="btn btn-primary">Login</button> |
//                             <Link className="btn btn-success" to={'/register'}>New User</Link>
//                             <Link className="btn btn-success" to={'/todolist'}>ToDo</Link>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;


import React, { useState } from 'react';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


function Login() {
    const [email, emailupdate] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     let regobj = {password, email };

    //     const response = await fetch('/api/login', {
    //         method: 'POST',
    //         body: JSON.stringify(regobj),
    //         headers: { 'content-Type': 'application/json' },
    //     });

    //     if (response.ok) {
    //         setAuthenticated(true);
    //     } else {
    //         alert('Please enter the valid email.');
    //     }
    // }

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = {password, email };
        if (IsValidate()) {
            //console.log(regobj);
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Logged in succesfully.')
                navigate('/todolist');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }

    if (authenticated) {
        return <p>You are now logged in.</p>;
    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label> Email <span className="errmsg">*</span><input type="text" value={email} onChange={(e) => emailupdate(e.target.value)} />
                                </label>
                            </div>
                            <label>
                                Password:<span className="errmsg">*</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            {/* <button type="submit">Log in</button> */}
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> |
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                            {/* <Link className="btn btn-success" to={'/todolist'}>ToDo</Link> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
