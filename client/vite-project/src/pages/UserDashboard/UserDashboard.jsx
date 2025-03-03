
import './UserDashboard.css'

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../../components/searchBar/Search';


import { FaUser } from "react-icons/fa6";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaRoad } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbSunElectricity } from "react-icons/tb";
import { MdOutlineReportProblem } from "react-icons/md";


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from "react-icons/io5";
import { MdDone } from "react-icons/md";

import Avatar from '@mui/material/Avatar';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid rgba(0,0,0,0.5)',
    boxShadow: 24,
    p: 4,
};

function UserDashboard({ timeAgo }) {
    const [open, setOpen] = React.useState(false);
    const [profileImg, setProfileImg] = useState('https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        date: "",
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleProfile(e) {
        const files = e.target.files;
        console.log(files)
        if (files && files[0]) {
            const file = files[0];
            const fileURL = URL.createObjectURL(file);
            setProfileImg(fileURL);
        }
    }

    useEffect(() => {
        const user_id = localStorage.getItem('user_id')

        const response = axios.get(`http://localhost:6500/api/users/${user_id}`)
            .then(response => {
                //   const date = (response.data.created_at).split('-')[0]
                //   console.log("data : ",date)
                setUserData({
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    email: response.data.email,
                    date: (response.data.created_at).split('-')[0]
                })
            }
            )
            .catch(err => {
                console.log('Error fetching data');
            });
    }, []);


    const [updateData, setUpdateData] = useState({
        firstName: "",
        lastName: ""
    })

    const handleEditProfile = async (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('user_id')
        const formData = {
            first_name: updateData.firstName,
            last_name: updateData.lastName
        }
        const response = await axios.post(`http://localhost:6500/api/users/editprofile/${user_id}`, formData)
        toast("Update Seccessful")
        handleClose()
        setUserData((prevData) => ({
            ...prevData,
            firstName: updateData.firstName,
            lastName: updateData.lastName,
        }));
        // console.log("res : ",response)
    }


    const [problemDatas, setProblemDatas] = useState([]);

    useEffect(() => {
        const handleProblemsData = async () => {
            const user_id = localStorage.getItem("user_id");

            if (user_id) {
                try {
                    const response = await axios.get(`http://localhost:6500/api/users/problem/${user_id}`);
                    setProblemDatas(response.data.problemData);
                    // console.log("Response data: ", response.data.problemData);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            } else {
                console.error("User ID not found in localStorage");
            }
        };

        handleProblemsData();
    }, []);
    const handleDeleteReport = async (itemId) => {
        try {
            const res = await axios.delete(`http://localhost:6500/api/users/problem/delete/${itemId}`);
            // console.log(res);

            setProblemDatas(prevProblemDatas =>
                prevProblemDatas.filter(item => item._id !== itemId)
            );

            toast("Report deleted successfully!");
        } catch (error) {
            console.error("OnDelete Error: ", error);
            toast.error("Failed to delete the report.");
        }
    }


    // review OpenClose
    const [openReview, setOpenReview] = useState(false)
    const [creditScore, setCreditScore] = useState(0)
    const [feedback, setFeedback] = useState("")
    const [isSolved, setSolved] = useState('');

    const handleOpenReview = (probId) => {
        setOpenReview(probId)
        // reviewFunction(problemId)
    }
    const handleCloseReview = () => {
        setOpenReview(false)
    }

    const reviewFunction = async (problemId) => {
        // console.log("p Iid : ",problemId)
        try {
            const repDetail = await axios.get(`http://localhost:6500/api/users/problem/getProblemData/${problemId}`)
            const { assignTo_id, _id, user_id } = repDetail.data.data
            const response = await axios.post('http://localhost:6500/api/users/credit', { assignTo_id, user_id, problemId, creditScore,feedback, isSolved})
            const updateStatusData = await axios.put(`http://localhost:6500/api/users/problem/updateIsSolved/${problemId}`,{isSolved})
            setProblemDatas((prevProblemDatas) => 
                prevProblemDatas.map((item) => 
                    item._id === problemId ? { ...item, isSolved: isSolved } : item
                )
            );
            setCreditScore('')
            toast("Review Submitted")
            console.log("up data ",updateData)
            handleCloseReview()
        } catch (error) {
            // console.log("zz : ",error.response.data.message)
            toast.error(error.response.data.message)
            setCreditScore('')
            console.error("Error in review funtion  ", error);
        }

    }




    return (
        <>
            <div className="main_user_con">
                <div className="item_con">
                    <div className="slide_con left">
                        <div className="icon_con">
                            {/* <FaUser /> */}
                            <Avatar className='profile' alt="Remy Sharp" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        </div>
                        <span className='name_user'>{`${userData.firstName} ${userData.lastName}`}</span>
                        <p className='date_user'>{`Member Since ${userData.date}`}</p>
                        <p className='email_user'>{userData.email}</p>
                        <button onClick={handleOpen} className='edit_profile'>Edit Profile</button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style, maxWidth: '90%', width: 'auto' }}>
                                <IoClose className='close_btn' onClick={handleClose} />
                                <form onSubmit={handleEditProfile} className='edit_profile_user' method='post'>
                                    <div className="profile_con">
                                        <img src={profileImg} alt="" />

                                    </div>
                                    <input type="file" name="" id="" onChange={handleProfile} />
                                    <div className="firstName_edit comm_inp">
                                        <p>First Name</p>
                                        <input type="text" placeholder='Enter your first name' onChange={e => setUpdateData({ ...updateData, firstName: e.target.value })} />
                                    </div>
                                    <div className="lastName_edit comm_inp">
                                        <p>Last Name</p>
                                        <input type="text" placeholder='Enter your last name' onChange={e => setUpdateData({ ...updateData, lastName: e.target.value })} />
                                    </div>
                                    <button className='edit_profile'>Edit Profile</button>
                                </form>
                            </Box>
                        </Modal>
                    </div>
                    <div className="slide_con right">
                        <div className="icon_con">
                            <MdOutlineReportGmailerrorred />
                        </div>
                        <span className='name_user'>Active issues</span>
                        <p className='date_user resolved_status '>{`${problemDatas.filter(item => item.status != "resolved").length} panding reports`} </p>
                        <p className='date_user resolved_status'>{`${problemDatas.filter(item => item.status == "resolved").length} resolved reports`} </p>
                        <Link to="/reportIssue"><button className="Report_new">Report New</button></Link>
                    </div>

                </div>
                <Search />
                <div className="active_issue_con">

                    <h4 className='title_con'>Resolved Issue</h4>
                    {
                        problemDatas.length > 0 ? (
                            problemDatas.filter((item) => item.status == "resolved").map((item, idx) => {
                                return (
                                    <div key={item._id} className="issue_con" >
                                        <div className="issue_name">
                                            {/* <MdOutlineReportProblem className='logo' /> */}
                                            <p className='title_isue'>{item.title}</p>
                                        </div>
                                        <span className="priority pri">{`${item.severity}`}</span>
                                        <span className="status pri">{item.status}</span>
                                        <span className="days "> {timeAgo(item.updated_at)}</span>
                                        {
                                            (item.isSolved != true) ?  <button className='give_review' onClick={() => handleOpenReview(item._id)}>Give Review</button> : <MdDone className='done_icon'/>
                                        }
                                        <Modal
                                            open={openReview == item._id}
                                            onClose={handleCloseReview}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style} >
                                                <IoClose className='close_btn' onClick={handleCloseReview} />
                                                <h2>Review Form</h2>


                                                <label >Give Credit Score (0 - 10)</label>
                                                <input type="number" min="0" max="10" placeholder='Between 0 to 10' onChange={(e) => { setCreditScore(e.target.value) }} required />


                                                <label >Feedback</label>
                                                <textarea placeholder="Enter your feedback..." onChange={(e) => { setFeedback(e.target.value) }} required></textarea>


                                                <label>Problem Solved?</label>
                                                <div className="buttons">
                                                    <button type="button" className={`solved ${isSolved === true && 'solved_active'}`} onClick={() => setSolved(true)}>Solved</button>
                                                    <button type="button" className={`unsolved ${isSolved === false && 'solved_active'}`} onClick={() => setSolved(false)}>Unsolved</button>
                                                </div>
                                                <p className="status-text">Click to select whether the problem was solved or not</p>

                                                <button type="submit" className="submit-btn" onClick={() => reviewFunction(item._id)}>Submit</button>

                                            </Box>
                                        </Modal>
                                    </div>
                                )

                            })
                        )
                            :
                            (<p className='msg'>No resolved report</p>)
                    }

                    <h4 >Your Active Issues</h4>
                    {
                        problemDatas.length > 0 ? (
                            problemDatas.filter((item) => item.status != "resolved").map((item, idx) => {
                                return (
                                    <div key={item._id} className="issue_con">
                                        <div className="issue_name">
                                            <MdOutlineReportProblem className='logo' />
                                            <p className='title_isue'>{item.title}</p>
                                        </div>
                                        <span className="priority pri">{`${item.severity} `}</span>
                                        <span className="status pri">{item.status}</span>
                                        <span className="days"> {timeAgo(item.updated_at)}</span>
                                        <MdDeleteForever className="delete" onClick={() => handleDeleteReport(item._id)} />
                                    </div>
                                )

                            })
                        )
                            :
                            (<p className='msg'>No any pending report</p>)
                    }




                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default UserDashboard