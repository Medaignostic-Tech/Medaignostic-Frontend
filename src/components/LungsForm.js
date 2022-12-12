import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import React from 'react';
import logo from '../assets/Medaignostic-logos.jpeg';

const sampleResponse = [
    {
        "type": "radio",
        "label": "Do you feel fewerish ?",
        "name": "q1",
        "option": ["Yes", "No"] 
    },
    {
        "type": "radio",
        "label": "Do you cough often ?",
        "name": "q2",
        "option": ["Yes", "No"]
    },
    {
        "type": "radio",
        "label": "Do you see any kind of sputum or mucus ?",
        "name": "q3",
        "option": ["Yes", "No"]
    },
    {
        "type": "number",
        "label": "How long have you had the cough (in days) ?",
        "name": "q4",
        "option": ["Cough Symptom (Type -1 NA for Not Applicable)"]
    },
    {
        "type": "text",
        "label": "What color is the mucus ?",
        "name": "q5",
        "option": ["Mucus Color (Type NA for Not Applicable)"]
    },
    {
        "type": "radio",
        "label": "Is mucus thick and ciscous or thin and runny ?",
        "name": "q6",
        "option": ["Thick and Ciscous", "Thin and Runny"]
    },
    {
        "type": "radio",
        "label": "Do you have chest discomfort with cough ?",
        "name": "q7",
        "option": ["Yes", "No"]
    },
    {
        "type": "radio",
        "label": "Do you feel you have to work hard to breathe ?",
        "name": "q8",
        "option": ["Yes", "No"]
    },
    {
        "type": "radio",
        "label": "Do you experience wheezing with your shortness of breath ?",
        "name": "q9",
        "option": ["Yes", "No"]
    },
    {
        "type": "radio",
        "label": "Do you ever have night sweats ?",
        "name": "q10",
        "option": ["Yes", "No"]
    },
    {
        "type": "radio",
        "label": "Do you feel 'tightness' more in your throat, or in your lungs ?",
        "name": "q11",
        "option": ["Yes", "No"]
    },
    {
        "type": "radio",
        "label": "Have you lost weight recently ?",
        "name": "q12",
        "option": ["Yes", "No"]
    }
];

function LungsForm() {
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
                                    { sampleResponse.map((element) => {
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