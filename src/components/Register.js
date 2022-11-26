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

function Register() {
    return (
        <div>
            <MainNavbar />
            <Container className='register-content' fluid={true}>
                <Row className='justify-content-md-center login-form'>
                    <Col md={{span:4}}>
                        <Card className='main-login mb-2' bg='light' text='dark' border='dark'>
                            <Card.Img variant="top" src={ logo } height="300em" />
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="/register">
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
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="phone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" placeholder="Enter phone number"/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="age">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control type="number" placeholder="Enter age" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="gender">
                                        <Form.Check inline name='gender' type="radio" placeholder="Male" label='Male'/>
                                        <Form.Check inline name='gender' type="radio" placeholder="Female" label='Female'/>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="confirm_password">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm Password" required/>
                                    </Form.Group>
                                    <Button variant="dark" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;