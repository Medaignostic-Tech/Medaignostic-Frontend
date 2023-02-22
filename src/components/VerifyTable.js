import React, { useState, useEffect } from 'react';
import { Table, Pagination, Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import auth from "../utils/auth";
import "../styles/VerifyTable.css"

function VerifyTable() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [verificationData, setVerificationData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const dashboardNavigate = useNavigate();

    const assignVerificationData = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        verificationData[key] = value;
    }

    const approveData = async (file_id) => {
        setIsLoading(true);
        let comments  = verificationData[file_id];
        let response = await auth.approveReport(file_id, comments);
        if (response["update_status"]) {
            alert("Approved Data Successfully");
            dashboardNavigate(0);
        }
        else {
            alert("Error approving report");
            dashboardNavigate(0);
        }
        setIsLoading(false);
    }

    const handlePaginationForward = () => {
        if (data.length !== 0) {
            setPage(page + 1);
        }
    }

    const handlePaginationBackward = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        const fetchData = async(pageNo) => {
            const d = await auth.getVerificationDataByPage(pageNo);
            if (d.length === 0 && pageNo !== 1) {
                setPage(page - 1);
            }
            setData(d);
        }

        fetchData(page);

    }, [page]);

    return (
        <div>
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Table bordered hover responsive variant='light'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Doctor Name</th>
                                    <th>Validation</th>
                                    <th>File URL</th>
                                    <th>Comments</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length !== 0 && data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.formatted_date}</td>
                                        <td>{item.doctor_name}</td>
                                        <td>{item.validation_name}</td>
                                        <td><Link to={`/view_verify_report/${item.file_id}`}>View Report</Link></td>
                                        <td>{item.status === 0 ? <textarea name={item.file_id} class="form-control" rows="2" placeholder='Enter your comments' onChange={async(e) => assignVerificationData(e)}></textarea> : <div>{item.comments}</div>}</td>
                                        <td>{item.status === 0 ? <Button variant='success' onClick={() => approveData(item.file_id)}>Approve</Button> : <div className="font-weight-bold p-2 text-success">Approved</div> }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                        <Pagination>
                            <Pagination.Item onClick={handlePaginationBackward}>Previous</Pagination.Item>
                            <Pagination.Item onClick={handlePaginationForward}>Next</Pagination.Item>
                        </Pagination>
                    </Col>
                </Row>
                <Modal show={isLoading} onHide={() => setIsLoading(false)}>
                    <Modal.Body>
                        <Spinner animation="border" /> Verifying......
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    )
}

export default VerifyTable;