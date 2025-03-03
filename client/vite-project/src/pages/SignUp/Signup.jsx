import React, { useState, useEffect } from 'react'
import './Signup.css'
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdRealEstateAgent } from "react-icons/md";
import { IoReturnUpForwardOutline } from "react-icons/io5";

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function Signup() {
    const [citizen, setCitizen] = useState(true)

    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            role: citizen ? "citizen" : "representative"
        }));
    }, [citizen]);

    function handleCitizen() {
        setCitizen(true)
    }

    function handleRep() {
        setCitizen(false)
    }
    const navigate = useNavigate()

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "citizen",
        location: "",
        state: "",
        district: "",
        wardNumber: ""

    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            first_name: values.first_name,
            last_name: values.last_name,
            password: values.password,
            email: values.email,
            role: values.role,
            location: values.location,
            state: values.state,
            district: values.district,
            wardNumber: values.wardNumber
        };
        try {
            const response = await axios.post('http://localhost:6500/api/users/register', formData);
            navigate('/login')
            toast.success(response.data.message)
        } catch (error) {
            console.error('Error during registration:', error.response?.data || error.message);
            toast.error(error.response.data.message)

        }
    }

    return (
        <>
            <div className="signup_contaner">
                <form className="inside_box" onSubmit={handleSubmit} method='post'>
                    <h2>Create Account</h2>
                    <span>Join our commnity to report and track local issues</span>
                    <div className="categ_person">
                        <Link className={`cit comm_cate  ${citizen === true ? "activeCommPer" : ""}`} onClick={() => handleCitizen()} >Citizen</Link>
                        <Link className={`rep comm_cate ${citizen === false ? "activeCommPer" : ""}`} onClick={() => handleRep()}>Representative</Link>
                    </div>
                    <h3>First Name</h3>
                    <div className="first_name comm_box">
                        <input onChange={e => setValues({ ...values, first_name: e.target.value })} type="text" placeholder='Enter your first name' />
                        <FaRegUser className='icon' />
                    </div>
                    <h3>Last Name</h3>
                    <div className="last_name comm_box">
                        <input onChange={e => setValues({ ...values, last_name: e.target.value })} type="text" placeholder='Enter your last name' />
                        <FaRegUser className='icon' />
                    </div>
                    <h3>Email</h3>
                    <div className="email_box comm_box">
                        <input onChange={e => setValues({ ...values, email: e.target.value })} type="text" placeholder='Enter your email' />
                        <MdOutlineMail className='icon' />
                    </div>
                    <h3>Password</h3>
                    <div className="pass_box comm_box">
                        <input onChange={e => setValues({ ...values, password: e.target.value })} type="password" placeholder='Create a password' />
                        <RiLockPasswordLine className='icon' />
                    </div>
                    {
                        citizen !== true ?
                            <>
                                <h3>State</h3>
                                <div className="email_box comm_box">
                                    <input required onChange={e => setValues({ ...values, state: e.target.value })} type="text" placeholder='Enter state' />
                                    <IoStatsChartSharp className='icon' />
                                </div>
                                <h3>District</h3>
                                <div className="email_box comm_box">
                                    <input required onChange={e => setValues({ ...values, district: e.target.value })} type="text" placeholder='Enter district' />
                                    <MdRealEstateAgent className='icon' />
                                </div>
                                <h3>Ward Number</h3>
                                <div className="email_box comm_box">
                                    <input required onChange={e => setValues({ ...values, wardNumber: e.target.value })} type="text" placeholder='Enter ward number' />
                                    <IoReturnUpForwardOutline className='icon' />
                                </div>
                            </>
                            :
                            ""
                    }
                    <button type="submit" className='create_btn'>Create Account</button>
                    <div className="nextpage_link">
                        <p>Already have an account? </p>
                        <Link className="sigin_btn" to="/login">Sign in</Link>
                    </div>

                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default Signup