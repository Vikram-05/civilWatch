import React from 'react'
import './Success.css'
import { MdOutlineDoneAll } from "react-icons/md";

function Success() {
    return (
        <div className="success_con">
            <h4>recent success stroies</h4>


            <div className="stories_con">
                <div className="img">
                    <MdOutlineDoneAll className='icon' />
                </div>
                <div className="details_con">
                    <p>Park cleaneup complete</p>
                    <span className='disc'>Resolve by john smith. cridit score +10</span>
                </div>
            </div>
            <div className="stories_con">
                <div className="img">
                    <MdOutlineDoneAll className='icon' />
                </div>
                <div className="details_con">
                    <p>street light repair</p>
                    <span className='disc'>Resolve by sarah johnson. cridit score +8</span>
                </div>
            </div>
            <div className="stories_con">
                <div className="img">
                    <MdOutlineDoneAll className='icon' />
                </div>
                <div className="details_con">
                    <p>street cleaneup complete</p>
                    <span className='disc'>Resolve by john smith. cridit score +13</span>
                </div>
            </div>
            <div className="stories_con">
                <div className="img">
                    <MdOutlineDoneAll className='icon' />
                </div>
                <div className="details_con">
                    <p>Park cleaneup complete</p>
                    <span className='disc'>Resolve by john smith. cridit score +10</span>
                </div>
            </div>


        </div>
    )
}
export default Success