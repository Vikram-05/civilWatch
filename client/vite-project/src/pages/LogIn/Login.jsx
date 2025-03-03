import React, { useState } from 'react'
import './Login.css'
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const navigate = useNavigate();


    const [values, setValues] = useState({
        email: "",
        password: "",

    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            password: values.password,
            email: values.email,
        };
        try {
            const response = await axios.post('http://localhost:6500/api/users/login', formData);
            // Save token after successful login
            const token = response.data.token;
            const user_id = response.data.user_id;
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user_id);

            console.log("my data is ", response.data);
            navigate('/')
            toast("Login successfully", {
                position: "top-right"
            });
        } catch (error) {
            console.error('Error during login:', error.response?.data || error.message);
            toast.error(error.response.data.message, {
                position: "top-right"
            });
        }
    }

    return (
        <div className="contaner_Login">
            <form className="inside_box" onSubmit={handleSubmit}>
                <h2>welcome back</h2>
                <span>Sign in continue reporting and tracking community issues</span>
                <h3>Email</h3>
                <div className="email_box comm_box">
                    <input onChange={e => { setValues({ ...values, email: e.target.value }) }} type="text" placeholder='Enter your email' />
                    <MdOutlineMail className='icon' />
                </div>
                <h3>Password</h3>
                <div className="pass_box comm_box">
                    <input onChange={e => { setValues({ ...values, password: e.target.value }) }} type="password" placeholder='Enter your password' />
                    <RiLockPasswordLine className='icon' />
                </div>
                <button className='Login_btn'>Sign In</button>
                <div className="nextpage_link">
                    <p>Don`t have an account? </p>
                    <Link className="sigin_btn" to="/signup">Sign Up</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login