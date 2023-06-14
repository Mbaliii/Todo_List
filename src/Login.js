import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [email, emailupdate] = useState("");
    const [password, passwordupdate] = useState("");

    const ProceedLogin = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form onSubmit={ProceedLogin} className="container">
                        <div className="card">
                            <div className="card-header">
                                <h2>Login Details</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label> Email <span className="errmsg">*</span></label>
                                    <input className="form-control"></input>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label> Password <span className="errmsg">*</span></label>
                                    <input className="form-control"></input>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Login</button> |
                                <Link className="btn btn-success" to={'/register'}>New User</Link> |
                                <Link className="btn btn-success" to={'/todolist'}>ToDo</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;