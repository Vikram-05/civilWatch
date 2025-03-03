
import './WorksCategory.css'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { IoTrashSharp } from "react-icons/io5";


import { MdOutlineReport } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";


function WorksCategory() {
    return (
        <>
            <div className="category_contaner report">
                <h4>How it  works</h4>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    freeMode={true}
                    pagination={false}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper swiper_work"
                    breakpoints={{
                        // When the viewport width is >= 320px
                        320: {
                          slidesPerView: 1,
                        },
                        // When the viewport width is >= 480px
                        480: {
                          slidesPerView: 1,
                        },
                        // When the viewport width is >= 768px
                        768: {
                          slidesPerView: 2,
                        },
                        // When the viewport width is >= 1024px
                        1024: {
                          slidesPerView: 3,
                        },
                      }}
                >
                    <SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                                <MdOutlineReport />
                            </div>
                            <span>report issues</span>
                            <p>submit problem with photo and location</p>
                        </div>
                    </SwiperSlide>




                    <SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                                <FaRegFilePdf />
                            </div>
                            <span>track progress</span>
                            <p>monitor resolution status</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                                <FaRegStar />
                            </div>
                            <span>rate work</span>
                            <p>review complete solution</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                                <IoTrashSharp />
                            </div>
                            <span>Waste</span>
                            <p>Santitation issues</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                                <IoTrashSharp />
                            </div>
                            <span>Waste</span>
                            <p>Santitation issues</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                                <IoTrashSharp />
                            </div>
                            <span>Waste</span>
                            <p>Santitation issues</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                                <IoTrashSharp />
                            </div>
                            <span>Waste</span>
                            <p>Santitation issues</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                                <IoTrashSharp />
                            </div>
                            <span>Waste</span>
                            <p>Santitation issues</p>
                        </div>
                    </SwiperSlide>





                </Swiper>
            </div>
        </>
    )
}
export default WorksCategory
