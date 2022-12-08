import UserNavbar from "./UserNavbar";
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";


function UserDashboard() {
    const loginNavigate = useNavigate();

    const [user, setUser] = useState({
        "id": "",
        "email": "",
        "is_active": true,
        "is_superuser": false,
        "is_verified": false,
        "name": ""
    });

    useEffect(() => {
        const fetchData = async () => {
            if (auth.isAuthenticated()) {
                const result = await auth.getUser();
                if (result === "Invalid or Inactive User" || result === "Internal Server Error") {
                    loginNavigate("/login", {replace:true, state:{"alert_status": "failure", "alert": result}});
                    loginNavigate(0);
                }
                else {
                    setUser(result);
                }
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <UserNavbar />
            <p>Hello { user.name }</p>
        </div>
    )
}

export default UserDashboard;