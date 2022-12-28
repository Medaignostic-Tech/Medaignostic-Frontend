import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import auth from "../utils/auth";
import UserNavbar from './UserNavbar';

function ViewReports() {
    const [loading, setLoading] = useState(true);
    const uploadResult = useLocation();
    const loginNavigate = useNavigate();

    const [user, setUser] = useState({
        "id": "",
        "email": "",
        "is_active": true,
        "is_superuser": false,
        "is_verified": false,
        "name": ""
    });

    const [response, setResponse] = useState({});

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
                    if (uploadResult.state !== null) {
                        const res = await auth.sendData(uploadResult.state.mainForms);
                        setResponse(res);
                        setLoading(false);
                    }
                }
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="common-background">
                <UserNavbar />
                <Spinner animation="grow" role="status" size="lg" style={{width: "150px", height: "150px", marginTop: "50px"}} variant="light" />
                <Container fluid className="jumbotron text-white text-center" style={{ marginBottom: '20px' }}>
                <Row>
                    <Col>
                        <h1 className="display-3 blink-text">Loading Your Results.....</h1>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }

    return (
        <div className="common-background">
            <UserNavbar />
            <Container fluid className="jumbotron text-white text-center" style={{ marginBottom: '20px' }}>
                <Row>
                    <Col>
                        <h1 className="display-3">Report Result</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Object.keys(response).map(key => {
                            for (const k in response[key]) {
                                return (
                                    <p style={{marginTop: "50px"}}>{ k } : { response[key][k] }</p>
                                )
                            }
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ViewReports;