import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Addstud() {
    const navigate = useNavigate();
    const [inputdata, setInputdata] = useState({
        "name": "",
        "contact": "",

    })

    //onchange function
    const setstud = (e) => {
        console.log(e.target.value);
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });
    }
    //onclick event
    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, contact } = inputdata;

        const res = await fetch("http://localhost:5000/api/cruds/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, contact
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            setInputdata(data);
            toast.success('Please wait  !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/');
            }, 3000);

        }
    }
    return (
        <div className='container mt-5'>
            <h4>Add Information</h4>
            <form className='row card-body col-sm-6 card'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Name"
                        onChange={setstud} name="name" value={inputdata.name} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">User Mobile</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Contact Number"
                        onChange={setstud} name="contact" value={inputdata.contact} />
                </div>
                <div className='d-flex'>
                    <button className='btn btn-warning ms-2' onClick={addinpdata}>Add User</button>
                    <ToastContainer />
                    <NavLink className='btn btn-primary ms-auto' to="/">Back</NavLink>
                </div>


            </form>
        </div>
    )
}
