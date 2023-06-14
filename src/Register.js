// import { useState } from "react";

// const Register = () => {

//     const [name, namechange] = useState("");
//     const [email, emailchange] = useState("");
//     const [password, passwordchange] = useState("");


//     const handlesubmit = (e) => {
//         e.preventDeafault();
//         let regobj={name, password, email};
//         console.log(regobj);

//     }
//     return (
//         <div>
//             <div className="offset-lg-3 col-lg-6">
//                 <form className="container" onSubmit={handlesubmit}>
//                     <div className="card">
//                         <div className="card-header">
//                             <h1>Register</h1>
//                         </div>
//                         <div className="card-body">
//                             <div className="row">
//                                 <div>
//                                     <div className="col-lg-6">
//                                         <div className="form-group"></div>
//                                         <label>Name<span className="errmsg"> *</span></label>
//                                         <input value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
//                                     </div>
//                                     <div className="col-lg-6">
//                                         <div className="form-group"></div>
//                                         <label>Email<span className="errmsg"> *</span></label>
//                                         <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
//                                     </div>
//                                     <div className="col-lg-6">
//                                         <div className="form-group"></div>
//                                         <label>Password<span className="errmsg"> *</span></label>
//                                         <input value={password} onChange={e=>passwordchange(e.target.value)} type="password" className="form-control"></input>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="card-footer">
//                             <button type="submit" className="btn btn-primary">Register</button> |
//                             <a className="btn btn-danger">Back</a>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }
// export default Register;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

   
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");


    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Name';
        }
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
        let regobj = { name, password, email };
        if (IsValidate()) {
            //console.log(regobj);
            fetch("http://localhost:5000/users", {
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
    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Registeration</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Name <span className="errmsg">*</span></label>
                                        <input value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input value={password} onChange={e => passwordchange(e.target.value)} type="password" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button> |
                            {/* <Link to={'/login'} className="btn btn-danger">Close</Link> */}
                            <Link to={'/home'} className="btn-btn-primary" >Home</Link>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Register;