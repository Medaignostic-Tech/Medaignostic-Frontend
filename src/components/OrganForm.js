import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import logo from '../assets/Medaignostic-logos.jpeg';
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";


function OrganForm(props) {
    const loginNavigate = useNavigate();

    const [response, setResponse] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (auth.isAuthenticated()) {
                const result = await auth.getForms(props.organ);
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
    }, []);

    return (
        <div style={{ marginBottom: '40px' }}>
            <Container className='login-content' fluid={true}>
                <Row className='justify-content-md-center login-form'>
                    <Col md={{span:4}}>
                        <Card className='main-login mb-2' bg='light' text='dark' border='dark'>
                            <Card.Img variant="top" src={ logo } height="300em" />
                            <Card.Header>
                                <h1>{ props.organ.charAt(0).toUpperCase() + props.organ.slice(1)}</h1>
                            </Card.Header>
                            <Card.Body>
                                <Form name={props.organ}>
                                    { response.map((element) => {
                                        let f;
                                        if (element.type === "radio") {
                                            f = (
                                                <Form.Group className="mb-3">
                                                    <Form.Label>{ element.label } </Form.Label><br />
                                                        {element.option.map((options) => {
                                                            let ele = (
                                                                <Form.Check inline name={ element.name } type="radio" placeholder={options} label={options} value={options} onChange={props.setForm} />
                                                            );
                                                            return ele;
                                                        })}
                                                    <hr style={{ height: "3px", background: "black"}} />
                                                </Form.Group>
                                            );
                                        }
                                        else if (element.type === "text" || element.type === "number") {
                                            f = (
                                                <Form.Group className="mb-3">
                                                    <Form.Label>{ element.label } </Form.Label><br />
                                                    <Form.Control inline name={element.name} type={element.type} placeholder={element.option[0]} onChange={props.setForm} />
                                                    <hr style={{ height: "3px", background: "black"}} />
                                                </Form.Group>
                                            );
                                        }
                                        else if (element.type === "file") {
                                            let ele = "";
                                            for (const option of element.option) {
                                                ele += option + ", ";
                                            }
                                            ele = ele.substring(0, ele.length-2);
                                            f = (
                                                <Form.Group className="mb-3">
                                                    <Form.Label>{ element.label } </Form.Label><br />
                                                    <Form.Control inline name={element.name} type={element.type} accept={ele} onChange={props.setForm}/>
                                                    <hr style={{ height: "3px", background: "black"}} />
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

export default OrganForm;