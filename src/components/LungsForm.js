import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import logo from '../assets/Medaignostic-logos.jpeg';
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";


function LungsForm() {
    const loginNavigate = useNavigate();

    const [response, setResponse] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (auth.isAuthenticated()) {
                const result = await auth.getForms("lungs");
                if (result === "Invalid or Inactive User" || result === "Internal Server Error") {
                    loginNavigate("/login", {replace:true, state:{"alert_status": "failure", "alert": result}});
                    loginNavigate(0);
                }
                else {
                    setResponse(result);
                }
            }
        }
        fetchData();
        console.log("hi");
    }, []);

    return (
        <div style={{ marginBottom: '40px' }}>
            <Container className='login-content' fluid={true}>
                <Row className='justify-content-md-center login-form'>
                    <Col md={{span:4}}>
                        <Card className='main-login mb-2' bg='light' text='dark' border='dark'>
                            <Card.Img variant="top" src={ logo } height="300em" />
                            <Card.Header>
                                <h1>Lungs</h1>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    { response.map((element) => {
                                        let f;
                                        if (element.type === "radio") {
                                            f = (
                                                <Form.Group className="mb-3">
                                                    <hr style={{ height: "5px", background: "black"}} />
                                                    <Form.Label>{ element.label } </Form.Label><br />
                                                        {element.option.map((options) => {
                                                            let ele = (
                                                                <Form.Check inline name={ element.name } type="radio" placeholder={options} label={options} />
                                                            );
                                                            return ele;
                                                        })}
                                                </Form.Group>
                                            );
                                        }
                                        else if (element.type === "text" || element.type === "number") {
                                            f = (
                                                <Form.Group className="mb-3">
                                                    <hr style={{ height: "5px", background: "black"}} />
                                                    <Form.Label>{ element.label } </Form.Label><br />
                                                        <Form.Control inline name={element.name} type={element.type} placeholder={element.option[0]} />
                                                </Form.Group>
                                            );
                                        }
                                        return f;
                                    }) }
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LungsForm;