import { Card, Container, Row, Col } from 'react-bootstrap';
import UserNavbar from "./UserNavbar";
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import logo from '../assets/Medaignostic-logos.jpeg';

function Profile() {
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
        <div className="mx-auto my-auto common-background">
            <UserNavbar />
            <Container className='login-content' fluid={true}>
                <Row className='justify-content-md-center login-form'>
                    <Col md={{span:3}}>
                        <Card className='main-login mb-2' bg='light' text='dark' border='dark'>
                            <Card.Img variant="top" src={ logo } height="300em" />
                            <Card.Header>
                                <h1>My Profile</h1>
                            </Card.Header>
                            <Card.Body>
                                <p>
                                    <strong>Name :</strong> {user.name}
                                </p>
                                <p>
                                    <strong>Age :</strong> {user.age}
                                </p>
                                <p>
                                    <strong>Gender :</strong> {user.gender}
                                </p>
                                <p>
                                    <strong>Phone :</strong> {user.phone}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;