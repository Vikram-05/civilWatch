
import './ReportCategory.css'

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

import { IoTrashSharp } from "react-icons/io5";
import { FaRoad } from "react-icons/fa";
import { TbSunElectricity } from "react-icons/tb";
import { FaHandHoldingWater } from "react-icons/fa";

function ReportCategory() {
    return (
        <>
            <div className="category_contaner">
                <h4>report category</h4>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    freeMode={true}
                    pagination={false}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper swiper_report"
                    breakpoints={{
                        // When the viewport width is >= 320px
                        320: {
                          slidesPerView: 1,
                        },
                        // When the viewport width is >= 480px
                        480: {
                          slidesPerView: 2,
                        },
                        // When the viewport width is >= 768px
                        768: {
                          slidesPerView: 3,
                        },
                        // When the viewport width is >= 1024px
                        1024: {
                          slidesPerView: 4,
                        },
                      }}
                >
                    <SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                            <IoTrashSharp/>
                            </div>
                            <span>Waste</span>
                            <p>Santitation issues</p>
                        </div>
                    </SwiperSlide>




                    <SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                            <FaRoad/>
                            </div>
                            <span>Road</span>
                            <p>infrastructure problem</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                            <TbSunElectricity/>
                            </div>
                            <span>electricity</span>
                            <p>power outage</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                            <FaHandHoldingWater/>
                            </div>
                            <span>water</span>
                            <p>supply issue</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                            <IoTrashSharp/>
                            </div>
                            <span>Waste</span>
                            <p>Santitation issues</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                            <IoTrashSharp/>
                            </div>
                            <span>Waste</span>
                            <p>Santitation issues</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                            <IoTrashSharp/>
                            </div>
                            <span>Waste</span>
                            <p>Santitation issues</p>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className="slide_con">
                            <div className="icon_con">
                            <IoTrashSharp/>
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

export default ReportCategory