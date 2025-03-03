import React from 'react'

import ReportCategory from '../../components/ReportCateSlider/ReportCategory';
import WorksCategory from '../../components/worksCategory/WorksCategory';
import Success from '../../components/successComponent/Success';
import Search from '../../components/searchBar/Search';
import './Home.css'

function Home() {
    return (
        <>
            <div className="home_contaner">
                <h2>Empower your community</h2>
                <p className='disc'>report local issues, track solutions, and rate reprsentative preformance</p>
                <Search/>
                <ReportCategory/>
                <WorksCategory/>
                <Success/>
            </div>
        </>
    )
}
export default Home;
