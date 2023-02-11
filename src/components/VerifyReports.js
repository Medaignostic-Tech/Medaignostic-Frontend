import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import { Container, Row, Col } from 'react-bootstrap';
import UserNavbar from './UserNavbar';
import VerifyTable from './VerifyTable';

function VerifyReports() {
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
        <div className='common-background'>
            <UserNavbar />
            <Container fluid className="jumbotron text-white text-center" style={{ marginBottom: '50px' }}>
                <Row>
                    <Col>
                        <h1 className="display-3">Verify Reports</h1>
                    </Col>
                </Row>
            </Container>
            <VerifyTable />
        </div>
    )
}

export default VerifyReports;