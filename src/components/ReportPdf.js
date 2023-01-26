import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from "../utils/auth";

function ReportPdf(props) {
    const loginNavigate = useNavigate();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

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
            <object data={props.url} type="application/pdf" width ="50%" height="850vh"></object>
        </div>
    )
}

export default ReportPdf;