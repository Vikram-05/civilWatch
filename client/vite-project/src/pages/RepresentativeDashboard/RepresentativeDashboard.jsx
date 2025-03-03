import React, { useEffect, useState } from 'react'
import './RepresentativeDashboard.css'
import { FaRegUser } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';

import axios from 'axios';

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

export default function RepresentativeDashboard({ timeAgo }) {


  const [open, setOpen] = React.useState(false);
  const [profileImg, setProfileImg] = useState('https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateData, setUpdateData] = useState({
    firstName: "",
    lastName: ""
  })
  function handleProfile(e) {
    const files = e.target.files;
    console.log(files)
    if (files && files[0]) {
      const file = files[0];
      const fileURL = URL.createObjectURL(file);
      setProfileImg(fileURL);
    }
  }
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
    setrepresentativeDatas((prevData) => ({
      ...prevData,
      first_name: updateData.firstName,
      last_name: updateData.lastName,
    }));
    // console.log("res : ",response)
  }

  const [RepsCredit, setRepCredit] = useState();




  const [activeTaskOn, setActiveTaskOn] = useState(true)
  const [representativeDatas, setrepresentativeDatas] = useState({
    email: "",
    first_name: "",
    last_name: "",
    district: "",
    state: "",
    wardNumber: ""
  })
  const [problemUnderYourArea, setProblemUnderYourArea] = useState([]);
  const [AllReview, setAllReview] = useState([])
  const [reviewUsers, setReviewUsers] = useState({}); 

  useEffect(() => {
    const userId = localStorage.getItem('user_id')
    const repData = async (e) => {
      try {
        const response = await axios.get(`http://localhost:6500/api/users/${userId}`)
        // console.log("res : ", response.data)
        setrepresentativeDatas({
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          district: response.data.district,
          state: response.data.state,
          wardNumber: response.data.wardNumber,
        })
      } catch (error) {
        console.log("Error in fetching representative data : ", error)
      }
    }
    repData()


    const problemsUnderYou = async (e) => {
      try {
        const response = await axios.get(`http://localhost:6500/api/users/problem/problemUnderRep/${userId}`)
        setProblemUnderYourArea(response.data.AllProblemData)
        // console.log("problem Data : ", response.data.AllProblemData)
      } catch (error) {
        console.log("Problem on fetching problem data ", error)
      }
    }
    problemsUnderYou()


    const AllRep = async (e) => {
      const user_id = localStorage.getItem('user_id')
      let total = 0;
      try {
        const res = await axios.get(`http://localhost:6500/api/users/credit/getSimilarRep/${user_id}`)
        // setRepCredit(res.data)
        for (let score of res.data.AllRepresentative) {
          total += score.credit_score;
          // console.log("score ",total)
        }
        setRepCredit(total)

      } catch (error) {
        console.log("Error in updating status: ", error);
      }
    }
    AllRep()

    

    const handleAllReviews = async () => {
    const user_id = localStorage.getItem('user_id')
    try {
      const res = await axios.get(`http://localhost:6500/api/users/credit/getSimilarRep/${user_id}`);
      setAllReview(res.data.AllRepresentative);

      // Create a list of promises to fetch user data for each review
      const userNamesPromises = res.data.AllRepresentative.map(async (review) => {
        const userRes = await axios.get(`http://localhost:6500/api/users/${review.user_id}`);
        return { userId: review.user_id, name: `${userRes.data.first_name} ${userRes.data.last_name}` };
      });

      // Wait for all the user data to be fetched
      const userNamesData = await Promise.all(userNamesPromises);

      // Create a user lookup object
      const userNames = userNamesData.reduce((acc, { userId, name }) => {
        acc[userId] = name;
        return acc;
      }, {});

      setReviewUsers(userNames);

    } catch (error) {
      console.log("Error in fetching reviews: ", error);
    }
  };

  handleAllReviews();
    
    
  }, [])



  const [openDetails, setOpenDetails] = useState(null);
  const [detailData, setDetailData] = useState({
    description: "",
    district: "",
    images: [],
    location: "",
    severity: "",
    state: "",
    status: "",
    title: "",
    user_id: "",
    wardNumber: "",
    first_name: "",
    last_name: "",
    email: "",

  })

  // Function to open the modal for a specific task
  const handleOpenDetails = async (taskId) => {
    setOpenDetails(taskId);
    const problemData = await axios.get(`http://localhost:6500/api/users/problem/getProblemData/${taskId}`)
    const { description, district, location, severity, state, status, title, wardNumber, user_id, images } = problemData.data.data;
    const UserData = await axios.get(`http://localhost:6500/api/users/${user_id}`)
    const { email, first_name, last_name } = UserData.data
    setDetailData({
      description: description,
      district: district,
      location: location,
      severity: severity,
      state: state,
      status: status,
      title: title,
      wardNumber: wardNumber,
      user_id: user_id,
      images: images,
      first_name: first_name,
      last_name: last_name,
      email: email
    })

    // console.log("pro data user: ", UserData.data)
  };

  // Function to close the modal
  const handleCloseDetails = () => {
    setOpenDetails(null);
  };


  const [status, setStatus] = useState("pending")

  const handleStatusChange = async (problem_id) => {
    try {
      const assignToId = localStorage.getItem('user_id')

      const response = await axios.put(`http://localhost:6500/api/users/problem/updateStatus/${problem_id}`, { status: status, assignTo_id: assignToId });


      setProblemUnderYourArea(prevState =>
        prevState.map(item =>
          item._id === problem_id ? { ...item, status: status } : item
        )
      );
      // console.log("Updated data : ", response.data.data);

      toast("Status Updated");
      handleCloseDetails();
    } catch (error) {
      console.log("Error in updating status: ", error);
      toast("Error in updating status");
    }
  };


  





  return (
    <>
      <div className="rep_main_com">
        <div className="slide_rep_con">
          <div className="first_con">
            <Avatar className='avtar' alt="Remy Sharp" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            <p>{`${representativeDatas.first_name} ${representativeDatas.last_name}`}</p>
            <span className='status'>{representativeDatas.email}</span>
            <span className="loc">{`${representativeDatas.state}, ${representativeDatas.district} ward ${representativeDatas.wardNumber} representatice`}</span>
            <button className='edit_btn' onClick={handleOpen}>Edit Profile</button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
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
          <div className="sec_con">
            <FaRegStar className='icon_rep' />
            <p className="creditScore">{`credit score : ${RepsCredit}`}</p>
            <span><div className="solve_issue">{`Based on ${problemUnderYourArea.filter(item => item.status == "resolved").length} resolved issues`}</div></span>
            <button className='view_his'>View History</button>
          </div>
          <div className="third_con">
            <BiTask className='icon_rep' />
            <p className="active_task">{`${problemUnderYourArea.filter(item => item.status != "resolved").length} pending Issues`}</p>
            <span className='priority'>{`${problemUnderYourArea.filter(item => (item.severity == "high" && item.status != "resolved")).length} high priority`} </span>
            <button className='req_more'>Request More</button>
          </div>
        </div>

        <div className="selector">
          <span className={`active_task ${activeTaskOn == true ? "active_on " : ""}`} onClick={() => setActiveTaskOn(true)}>Active Tasks</span>
          <span className={`resolved_issue ${activeTaskOn == false ? "active_on " : ""}`} onClick={() => setActiveTaskOn(false)}>Resolved Issues</span>
        </div>
        {
          activeTaskOn === true ?
            <>
              <div className="active_issue_con">
                <h4>current tasks</h4>

                {
                  problemUnderYourArea.filter(item => item.status != "resolved").map((item, idx) => (
                    <div key={item._id} className="issue_con" onClick={() => handleOpenDetails(item._id)}>
                      <div className="issue_name">
                        <MdOutlineReportProblem className='logo' />
                        <p className='title'>{item.title}</p>
                      </div>
                      <span className="priority">{item.severity}</span>
                      <span className="status">{item.status}</span>
                      <span className="days">{timeAgo(item.updated_at)}</span>
                      <MdEdit className="delete" />
                    </div>
                  ))
                }
                <Modal
                  open={openDetails !== null && openDetails !== false}
                  onClose={handleCloseDetails}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} className="d">
                    <IoClose className='close_btn' onClick={handleCloseDetails} />
                    {/* <p>{openDetails}</p> */}
                    <div className="details_contaner">
                      <Avatar className='avtar' alt="Remy Sharp" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                      <p>{`${detailData.first_name} ${detailData.last_name}`}</p>
                      <span className='email'>{detailData.email}</span>
                      <span className='loc'>{`${detailData.state}, ${detailData.district} ward number ${detailData.wardNumber}`}</span>
                      <h4 className='issue'>Problem Category : </h4>
                      <span >{detailData.title}</span>
                      <br />
                      <h4 className='issue'>Priority : </h4>
                      <span>{detailData.severity}</span>
                      <h4 >Discription : </h4>
                      <span className='disc'>{detailData.description}</span>

                      <div className="all_img">
                        <img src="https://tse3.mm.bing.net/th?id=OIP.a_NBaDZCwiV6fKa7XJ6B9AHaEK&pid=Api&P=0&h=180" alt="" />
                        <img src="https://tse3.mm.bing.net/th?id=OIP.a_NBaDZCwiV6fKa7XJ6B9AHaEK&pid=Api&P=0&h=180" alt="" />
                        <img src="https://tse3.mm.bing.net/th?id=OIP.a_NBaDZCwiV6fKa7XJ6B9AHaEK&pid=Api&P=0&h=180" alt="" />
                        <img src="https://tse3.mm.bing.net/th?id=OIP.a_NBaDZCwiV6fKa7XJ6B9AHaEK&pid=Api&P=0&h=180" alt="" />
                      </div>
                      <h4 className='issue'>Current Status : </h4>
                      <span>{detailData.status}</span>
                      <h4>Change Status : </h4>
                      <div className="status_con">
                        <button className={`set_status pending  ${status == "pending" ? 'activeSelectStatus' : ''}`} onClick={() => setStatus("pending")}>Pending</button>
                        <button className={`set_status in_process ${status == "inProcess" ? 'activeSelectStatus' : ''}`} onClick={() => setStatus("inProcess")}>In Process</button>
                        <button className={`set_status resolved ${status == "resolved" ? 'activeSelectStatus' : ''}`} onClick={() => { setStatus("resolved") }}>Resolved</button>
                      </div>
                      <button className='update_status' onClick={() => handleStatusChange(openDetails)}>Update Status</button>
                    </div>
                  </Box>
                </Modal>
              </div>

            </>
            :
            <>
              <div className="active_issue_con">
                <h4>Resolved issues</h4>

                {
                  problemUnderYourArea.filter(item => item.status == 'resolved').map((item, idx) => (
                    <div key={item._id} className="issue_con">
                      <div className="issue_name">
                        <MdDone className='logo' />
                        <p>{item.title}</p>
                      </div>
                      <span className="priority">{item.severity}</span>
                      <span className="status">{item.status}</span>
                      <span className="days">{`${Math.floor((Date.now() - new Date(item.updated_at).getTime()) / (1000 * 60 * 60 * 24))} days ago`}</span>
                    </div>
                  ))
                }

              </div>
            </>
        }


        <h4 className='rec_rev_tit'>Recent Feedback</h4>
        <div className="review_main_con">

          {
            AllReview.map((item, idx) => (
              <div key={item._id} className="review_con">
                <Avatar className='avtar' alt="Remy Sharp" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                <div className="avtar_det">
                  <p className="name">{reviewUsers[item.user_id]}</p>
                  <span className="message">{(item.feedback).split(' ').length > 10 ? item.feedback.split(' ').slice(0, 6).join(' ') + "..." : item.feedback}<span className="credit_score">{`|  credit Score :  +${item.credit_score}`}</span></span>
                  
                </div>
                <AiOutlineLike className='like' />
              </div>
            ))
          }


        </div>


      </div>
    </>
  )
}
