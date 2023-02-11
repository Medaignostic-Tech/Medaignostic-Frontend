import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserNavbar from "./UserNavbar";
import ReportPdf from "./ReportPdf";
import auth from "../utils/auth";

function ViewVerifyReports() {
    const params = useParams();

    const [response, setResponse] = useState();

    useEffect(() => {
        const fetchData = async () => {
            if (auth.isAuthenticated()) {
                const resp = await auth.viewVerificationReport(params.report_id);
                setResponse(resp);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="common-background" style={{minHeight: "130vh"}}>
            <UserNavbar />
            <Container fluid className="jumbotron text-white text-center" style={{ marginBottom: '20px' }}>
                <Row>
                    <Col>
                        <h1 className="display-3">Report Result</h1>
                    </Col>
                </Row>
                <br /><br />
                <Row>
                    <Col>
                        <div>
                            {response ? <ReportPdf url={URL.createObjectURL(response)} /> : <div></div>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ViewVerifyReports;