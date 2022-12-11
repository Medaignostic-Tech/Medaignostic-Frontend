import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import React from 'react';
import logo from '../assets/Medaignostic-logos.jpeg';

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
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Do you feel fewerish ? </Form.Label><br />
                                        <Form.Check inline name='q1' type="radio" placeholder="Yes" label='Yes' />
                                        <Form.Check inline name='q1' type="radio" placeholder="No" label='No' />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Do you cough often ? </Form.Label><br />
                                        <Form.Check inline name='q2' type="radio" placeholder="Yes" label='Yes' />
                                        <Form.Check inline name='q2' type="radio" placeholder="No" label='No' />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Do you see any kind of sputum or mucus ? </Form.Label><br />
                                        <Form.Check inline name='q2' type="radio" placeholder="Yes" label='Yes' />
                                        <Form.Check inline name='q2' type="radio" placeholder="No" label='No' />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>How long have you had the cough (in days) ? </Form.Label><br />
                                        <Form.Control inline name='q3' type="number" placeholder="Cough Symptom (Type -1 NA for Not Applicable)" />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>What color is the mucus ? </Form.Label><br />
                                        <Form.Control inline name='q4' type="text" placeholder="Mucus Color (Type NA for Not Applicable)" />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Is mucus thick and ciscous or thin and runny? ? </Form.Label><br />
                                        <Form.Check inline name='q5' type="radio" placeholder="Thick and Ciscous" label='Thick and Ciscous' />
                                        <Form.Check inline name='q5' type="radio" placeholder="Thin and Runny" label='Thin and Runny' />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Do you have chest discomfort with cough ? </Form.Label><br />
                                        <Form.Check inline name='q6' type="radio" placeholder="Yes" label='Yes' />
                                        <Form.Check inline name='q6' type="radio" placeholder="No" label='No' />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Do you feel you have to work hard to breathe ? </Form.Label><br />
                                        <Form.Check inline name='q7' type="radio" placeholder="Yes" label='Yes' />
                                        <Form.Check inline name='q7' type="radio" placeholder="No" label='No' />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Do you experience wheezing with your shortness of breath ? </Form.Label><br />
                                        <Form.Check inline name='q7' type="radio" placeholder="Yes" label='Yes' />
                                        <Form.Check inline name='q7' type="radio" placeholder="No" label='No' />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Do you ever have night sweats ? </Form.Label><br />
                                        <Form.Check inline name='q8' type="radio" placeholder="Yes" label='Yes' />
                                        <Form.Check inline name='q8' type="radio" placeholder="No" label='No' />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Do you feel 'tightness' more in your throat, or in your lungs ? </Form.Label><br />
                                        <Form.Check inline name='q9' type="radio" placeholder="Yes" label='Yes' />
                                        <Form.Check inline name='q9' type="radio" placeholder="No" label='No' />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Have you lost weight recently ? </Form.Label><br />
                                        <Form.Check inline name='q10' type="radio" placeholder="Yes" label='Yes' />
                                        <Form.Check inline name='q10' type="radio" placeholder="No" label='No' />
                                    </Form.Group>
                                    <hr style={{ height: "5px", background: "black"}} />
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