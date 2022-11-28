import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import MainNavbar from './MainNavbar';
import '../styles/Login.css'
import logo from '../assets/Medaignostic-logos.jpeg';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [alert, setAlert] = useState('');
    const [alert_status, setAlertStatus] = useState('text-danger');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerResult = useLocation();

    const registerHandler = async () => {
        await axios.post(`http://localhost/login`, {
            'email': email,
            'password': password
        }, {withCredentials: true})
        .then(res => {
            if (res.data.login_status === "success") {
                setAlert("Login Success");
                setAlertStatus("text-success");
            }
            else if (res.data.login_status === "user_invalid") {
                setAlert("Invalid User");
                setAlertStatus("text-danger");
            }
            else if (res.data.login_status === "password_invalid") {
                setAlert("Wrong Password");
                setAlertStatus("text-danger");
            }
        });
    };

    useEffect(() => {
        if (registerResult.state !== null) {
            if (registerResult.state.alert_status === "success") {
                setAlertStatus('text-success');
            }
            else if (registerResult.state.alert_status === "failure") {
                setAlertStatus('text-danger');
            }
            setAlert(registerResult.state.alert);
        }
    });

    return (
        <div>
            <MainNavbar />
            <Container className='login-content' fluid={true}>
                <Row className='justify-content-md-center login-form'>
                    <Col md={{span:3}}>
                        <Card className='main-login mb-2' bg='light' text='dark' border='dark'>
                            <Card.Img variant="top" src={ logo } height="300em" />
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="/login">
                                    <Nav.Item>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/register">Register</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" required onChange={event => setEmail(event.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" required onChange={event => setPassword(event.target.value)}/>
                                    </Form.Group>
                                    <Button variant="dark" type="button" onClick={registerHandler}>
                                        Submit
                                    </Button>
                                </Form>
                                <Card.Link variant='primary' href='/forgot_password'>
                                    Forgot your Password ?
                                </Card.Link>
                            </Card.Body>
                            <Card.Footer className={ alert_status }>{ alert }</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;