import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Allstud() {

    const [getstud, SetGetstud] = useState([]);
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
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Search User"
                    onChange={(e) => searchStud(e.target.value)}
                />
            </div>

            <table className="table table-bordered mt-5">

                <tbody>
                    {getstud.filter((val) => {
                        if (searchInput == "") {
                            return val
                        } else if (parseFloat(val.contact) == parseFloat(searchInput)) {
                            return val;
                        }
                    }).map((result, id) => {
                        return (
                            <>

                                <div class="col-sm">
                                    <div class="col-sm-6">
                                        <div class="card">

                                            <div class="card-body">

                                                <h5 class="card-title">{result._id}</h5>
                                                <h5 class="card-title">{result.photo}</h5>

                                                <p class="card-text">{result.name}</p>
                                                <p class="card-text">{result.contact}</p>

                                                <Link className='btn btn-warning ms-2' to={`/edit/${result._id}`}>Update</Link>
                                                <button className='btn btn-danger ms-2'
                                                    data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => deletestud(result._id)}>Delete</button>
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
