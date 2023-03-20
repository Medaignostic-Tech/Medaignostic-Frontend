import UserNavbar from "./UserNavbar";
import "../styles/Dashboard.css";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import auth from "../utils/auth";

function UserDashboard() {
    const loginNavigate = useNavigate();

    const [style,
        setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    const [user,
        setUser] = useState({
        id: "",
        email: "",
        is_active: true,
        is_superuser: false,
        is_verified: false,
        name: ""
    });
    const [userStatistics,
        setUserStatsistics] = useState({diagnosed_patients: 0, approved_reports: 0, yet_to_approve: 0, today_approval: 0});

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        } else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
    };

    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        } else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
    };

    const userStats = async() => {
        const stats = await auth.getUserStats();
        console.log(stats);
        setUserStatsistics(stats);
    }

    useEffect(() => {
        const fetchData = async() => {
            if (auth.isAuthenticated()) {
                const result = await auth.getUser();
                if (result === "Invalid or Inactive User" || result === "Internal Server Error") {
                    loginNavigate("/login", {
                        replace: true,
                        state: {
                            alert_status: "failure",
                            alert: result
                        }
                    });
                    loginNavigate(0);
                } else {
                    setUser(result);
                    await userStats();
                }
            }
        };
        fetchData();
    }, []);

    return (
        <div className="common-background">
            <UserNavbar/>
            <body id="page-top">
                <div id="wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <div className="container-fluid">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">
                                        Welcome to MedAIgnostic
                                    </h1>
                                </div>

                                <div className="row">
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Diagnosed Patients
                                                        </div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                            {userStatistics["diagnosed_patients"]}
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-hospital-user fa-2x text-black-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-success shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                            Approved Reports
                                                        </div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                            {userStatistics["approved_reports"]}
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-user-check fa-2x text-black-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-info shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                            Yet to approve
                                                        </div>
                                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                            {userStatistics["yet_to_approve"]}
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-user-clock fa-2x text-black-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-warning shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                            Today Approval
                                                        </div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                            {userStatistics["today_approval"]}
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-thumbs-up fa-2x text-black-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {" "}
                                    <div className="col-xl-8 col-lg-7">
                                        <div className="card shadow mb-4">
                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary">
                                                    Overall approval
                                                </h6>

                                                <div class="donut-chart-block block">
                                                    <div class="donut-chart">
                                                        <div id="part1" class="portion-block">
                                                            <div class="circle"></div>
                                                        </div>
                                                        <div id="part2" class="portion-block">
                                                            <div class="circle"></div>
                                                        </div>
                                                        <div id="part3" class="portion-block">
                                                            <div class="circle"></div>
                                                        </div>
                                                        <div id="part4" class="portion-block">
                                                            <div class="circle"></div>
                                                        </div>

                                                        <p class="center"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="heading">
                                    <center>
                                        <h3>Latest Approvals</h3>
                                    </center>
                                </div>
                                <div class="row my-5">
                                    <div class="col">
                                        <table class="table table-striped bg-white rounded shadow-sm  table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col" width="50">
                                                        #
                                                    </th>
                                                    <th scope="col">PATIENT NAME</th>
                                                    <th scope="col">DIAGNOSED DISEASE</th>
                                                    <th scope="col">APPROVED TIME</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">101</th>
                                                    <td>Ram</td>
                                                    <td>Chronic Kidney</td>
                                                    <td>8:00 am , 01.02.2023</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">102</th>
                                                    <td>Rajeev</td>
                                                    <td>Pneumonia</td>
                                                    <td>9:00 am , 31.01.2023</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">103</th>
                                                    <td>John</td>
                                                    <td>Haemorrhage</td>
                                                    <td>7:00 pm , 30.01.2023</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">104</th>
                                                    <td>Jane</td>
                                                    <td>Chronic Kidney</td>
                                                    <td>5:00 pm , 30.01.2023</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">105</th>
                                                    <td>Arun</td>
                                                    <td>Pneumonia</td>
                                                    <td>2:00 pm , 30.01.2023</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default UserDashboard;
