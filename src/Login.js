import React, { useState } from 'react';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


function Login() {
    const [email, emailupdate] = useState('');
    const [password, setPassword] = useState('');
    // const [authenticated, setAuthenticated] = useState(false);


    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = ' Incorrect Credentials';
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test(password)) {

            } else {
                isproceed = false;
                toast.warning('Please enter the valid password')
            }
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
