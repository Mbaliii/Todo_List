import React from "react";
import { Link } from "react-router-dom";
import "./css/style.css";

const Home = () => {
    const picture = new URL('./img/polygon-scatter-haikei.png', import.meta.url)
    return (
        <div>
            <center>
            <h1>Welcome :)</h1>
            <div> 
                <img src={picture} alt=""/>
                <center>
                <Link className="btn btn-success" to={'/register'}>New User</Link>
                </center>
            </div>
            </center>
        </div>
    );
}
export default Home;