import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from "../utils/auth";

function ReportPdf(props) {
    const loginNavigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (auth.isAuthenticated()) {
                const result = await auth.getOrgans();
                if (result === "Invalid or Inactive User" || result === "Internal Server Error") {
                    loginNavigate("/login", {replace:true, state:{"alert_status": "failure", "alert": result}});
                    loginNavigate(0);
                }
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <object data={props.url} type="application/pdf" width ="45%" height="850vh"></object>
        </div>
    )
}

export default ReportPdf;