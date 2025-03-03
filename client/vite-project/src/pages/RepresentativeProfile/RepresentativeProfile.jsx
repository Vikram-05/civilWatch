import React, { useEffect, useState } from 'react'
import './RepresentativeProfile.css'
import Avatar from '@mui/material/Avatar';
import { MdOutlineStars } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { HiExclamationTriangle } from "react-icons/hi2";

import axios from 'axios';
import { useParams } from 'react-router-dom';

function RepresentativeProfile() {
    const [representativeData , setRepresentativeData] = useState(null);
    const {id } = useParams()

    useEffect(() => {
        // Fetch data for the representative when the component mounts or id changes
        const fetchData = async () => {
            try {
                console.log("Fetching representative data for ID:", id);
                const response = await axios.get(`http://localhost:6500/api/users/representativeProfile/${id}`);
                setRepresentativeData(response.data.data); 
                console.log("res ",response.data.data)
            } catch (error) {
                console.log("Error in fetching representative data", error);
            }
        };

        // Only fetch data if id is available
        if (id) {
            fetchData();
        }
    }, [id]); 
    if (!representativeData) {
        return <p className='loader'>Loading...</p>; // You can show a loading spinner or message
    }




    return (
        <>
            <div className="repsantative_contaner">
                <div className="profile_det_con">
                    <Avatar className='avtar' alt="Remy Sharp" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                     <p className="rep_name">{`${representativeData.first_name} ${representativeData.last_name}`}</p>
                    <span className="email d_block">{`Email : ${representativeData.email}`}</span>
                    <span className="location_area d_block">{`State : ${representativeData.state}`}</span>
                    <span className="location_area d_block">{`District : ${representativeData.district} ward number :  ${representativeData.wardNumber}`}</span>
                    <div className="contact_btn_con">
                        <button className='contact_btn'>Contact Representative</button>
                        <button className="view">View Service Area</button>
                    </div>
                </div>
                <div className="credit_det_con">
                    <MdOutlineStars className='icon' />
                    <p className='credit_score'>Credit Score : 92</p>
                    <span className="det">Top 10% representative in the region</span>
                    <button className='view_his'>View History</button>

                </div>

                

                <h4>Recent Reviews</h4>

                <div className="review_main_con">
                    <div className="review_con">
                        <Avatar className='avtar' alt="Remy Sharp" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        <div className="avtar_det">
                            <p className="name">Sarah Johnson</p>
                            <span className="message">Excellent work on fixing the rode issue promptly!</span>
                        </div>
                        <AiOutlineLike className='like' />

                    </div>
                    <div className="review_con">
                        <Avatar className='avtar' alt="Remy Sharp" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        <div className="avtar_det">
                            <p className="name">Sarah Johnson</p>
                            <span className="message">Excellent work on fixing the rode issue promptly!</span>
                        </div>
                        <AiOutlineLike className='like' />

                    </div>
                    <div className="review_con">
                        <Avatar className='avtar' alt="Remy Sharp" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        <div className="avtar_det">
                            <p className="name">Sarah Johnson</p>
                            <span className="message">Excellent work on fixing the rode issue promptly!</span>
                        </div>
                        <AiOutlineLike className='like' />

                    </div>
                </div>

                <h5>Leave a Review</h5>
                <textarea placeholder="Share your experience with this representative" name="" id=""></textarea>

                <button className='submit_rev'>Submit Review</button>

            </div>
        </>
    )
}

export default RepresentativeProfile 