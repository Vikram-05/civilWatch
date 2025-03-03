import React, { useState } from 'react'
import './ReportIssue.css'
import axios from 'axios';
import { IoLocationSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';

function ReportIssue() {
    const [values, setValues] = useState({
        title: "",
        description: "",
        location: "",
        state : "",
        district : "",
        wardNumber :"",
        images: [],
        severity: "low",
        status: "pending",
    });

    // Function to handle severity button clicks
    const handleSeverityClick = (level) => {
        setValues(prevValues => ({
            ...prevValues,
            severity: level
        }));
    };

    // Function to handle file uploads
    const handleImageUpload = (e) => {
        const files = e.target.files;
        const imageArray = Array.from(files).map(file => URL.createObjectURL(file));
        setValues(prevValues => ({
            ...prevValues,
            images: [...prevValues.images, ...imageArray]
        }));
    };

    // Function to handle the use of current location
    const useCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const location = `${position.coords.latitude}, ${position.coords.longitude}`;
                setValues(prevValues => ({
                    ...prevValues,
                    location: location
                }));
            }, (error) => {
                alert("Unable to retrieve location");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleCategoryChange = (e) => {
        const selectCategory = e.target.value;
        setValues(prevValues => ({
            ...prevValues,
            category: selectCategory,
            title: selectCategory ? `${selectCategory} Issue` : ""
        }))
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if title, state, district, wardNumber are filled
    if (!values.title || !values.state || !values.district || !values.wardNumber) {
        toast.error("Please fill in all required fields.");
        return;  // Prevent submission if any field is missing
    }

    // Prepare the form data
    const formData = {
        title: values.title,
        description: values.description,
        location: values.location,
        images: values.images,
        severity: values.severity,
        state: values.state,
        district: values.district,
        wardNumber: values.wardNumber,
    };

    const token = localStorage.getItem('token');

    try {
        // Send the POST request to the backend
        const response = await axios.post('http://localhost:6500/api/users/problem/createProblem', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Reset form values after successful submission
        setValues({
            title: "",
            description: "",
            location: "",
            images: [],
            severity: "low",
            status: "pending",
            state: "",
            district: "",
            wardNumber: "",
        });

        // Show success message
        toast.success(response.data.message);
    } catch (error) {
        console.error('Error during submission:', error.response?.data || error.message);
        toast.error("Data not submitted. Please try again.");
    }
};


    return (
        <>
            <form className="report_con" onSubmit={handleSubmit}>
                <h4 className='report_title'>Report an Issue</h4>

                <label className='a'>Issue Category
                    <select required onChange={handleCategoryChange}>
                        <option value="" >Select issue type</option>
                        <option value="road">Road</option>
                        <option value="electricity">Electricity</option>
                        <option value="water">Water</option>
                        <option value="waste">Waste</option>
                    </select>
                </label>

                <div className="dec_box">
                    <span htmlFor="description">Description</span>
                    <textarea value={values.description} onChange={e => setValues({ ...values, description: e.target.value })} id="description" placeholder="Describe the issue in detail"></textarea>
                </div>


                <span className="location_title">Location</span>
                <div className="loc_info">
                    <div className="det_box1">
                        <span className='state'>State</span>
                        <input value={values.state} type="text" name="" id="" placeholder='Enter State' onChange={e => setValues({ ...values, state: e.target.value })}/>

                    </div>
                    <div className="det_box2">
                        <span className='district'>District</span>
                        <input value={values.district} type="text" name="" id="" placeholder='Enter District' onChange={e => setValues({ ...values, district: e.target.value })}/>

                    </div>
                    <div className="det_box3">

                        <span className='wardNo'>Ward No.</span>
                        <input value={values.wardNumber} type="text" name="" id="" placeholder='Enter Ward Number' onChange={e => setValues({ ...values, wardNumber: e.target.value })}/>
                    </div>
                </div>
                <div className="location_box">
                    <input
                        onChange={e => setValues({ ...values, location: e.target.value })}
                        type="text"
                        value={values.location}
                        placeholder='Enter location'
                    />
                    <IoLocationSharp className='location' />
                </div>
                <button type="button" className='current_loc' onClick={useCurrentLocation}>Use Current Location</button>

                <div className="level_con">
                    <span className="level">Severity Level</span>
                    <button type="button" onClick={() => handleSeverityClick("low")} className={values.severity === "low" ? "active_Severity" : ""}>Low</button>
                    <button type="button" onClick={() => handleSeverityClick("medium")} className={values.severity === "medium" ? "active_Severity" : ""}>Medium</button>
                    <button type="button" onClick={() => handleSeverityClick("high")} className={values.severity === "high" ? "active_Severity" : ""}>High</button>
                </div>

                <div className="upload_box">
                    <input type="file" multiple onChange={handleImageUpload} />
                    {values.images.length > 0 && (
                        <div className="image_preview">
                            {values.images.map((image, index) => (
                                <img key={index} src={image} alt={`Preview ${index}`} className="image_thumb" />
                            ))}
                        </div>
                    )}
                </div>

                <div className="preview_box">
                    <span>Preview</span>
                    <p>Review your report before submission</p>
                    <div className="btn_con">
                        <button type="submit" className='submit'>Submit Report</button>
                        <button type="button" className='edit'>Edit Report</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}

export default ReportIssue;
