import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Allstud() {

    const [getstud, SetGetstud] = useState([]);
    const navigate = useNavigate();

    //console.log(getstud)
    //get student Data
    const getstuddata = async () => {

        const res = await fetch("http://localhost:5000/api/cruds/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            SetGetstud(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getstuddata();
    }, [])

    //Delete student data
    const deletestud = async (id) => {

        const res2 = await fetch(`http://localhost:5000/api/cruds/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            getstuddata();
            toast.success('Deleted', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }
    //search Student
    const [searchInput, setSearchInput] = useState('');
    const searchStud = (searchval) => {
        setSearchInput(searchval)
    }
    return (
        <div className='container mt-5'>

            <div className="ms-left w-50">
                <input type="email" className="form-control"
                    placeholder="Search User"
                    onChange={(e) => searchStud(e.target.value)}
                />
            </div>

            <table className="table table-bordered mt-5">

                <tbody>
                    {getstud.filter((val) => {
                        if (searchInput === "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchInput.toLowerCase())) {
                            return val;
                        }
                    }).map((item) => {
                        return (
                            <>

                                <div className="col-sm">
                                    <div className="col-sm-6">
                                        <div className="card" >
                                            <div className="card-body">
                                                <Avatar githubHandle="sitebase" className='text-center' cla size={50} round="20px" />
                                                <h5 className="card-title">User Id: {item._id}</h5>
                                                <p className="card-text">Name: {item.name}</p>
                                                <p className="card-text">Contact: {item.contact}</p>

                                                <Link className='btn btn-warning ms-2' to={`/edit/${item._id}`}>Update</Link>
                                                <button className='btn btn-danger ms-2'
                                                    data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => deletestud(item._id)}>Delete</button>
                                                <ToastContainer />

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </>
                        )
                    })}




                </tbody>
            </table>

        </div>
    )
}
