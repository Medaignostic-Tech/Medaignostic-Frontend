import {Container, Row, Col} from 'react-bootstrap';
import heroPic from '../assets/medp3.jpg';

function HomeHero() {
    return (
        <div
            style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '100%'
        }}>
            <Container
                style={{
                padding: '30px',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <Row>
                    <Col md={6}>
                        <img
                            src={heroPic}
                            alt="about"
                            style={{
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '10px',
                            boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
                            width: '550px',
                            height: '550px'
                        }}/>
                    </Col>
                    <Col
                        md={6}
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div
                            style={{
                            textAlign: 'center'
                        }}>
                            <h1
                                style={{
                                fontSize: '4rem',
                                marginBottom: '2rem',
                                color: '#203d79'
                            }}>MEDAIGNOSTIC</h1>
                            <p
                                style={{
                                fontSize: '1.5rem',
                                marginBottom: '2rem',
                                color: '#666'
                            }}>
                                MedAIgnostic (Medical AI Diagnostic) is a interactive and easy to use tool for
                                storing medical reports and get automatic diagnosis. Through this user-friendly
                                web application, users can keep their medical reports and gain insightful
                                information with the help of AI. This framework is open sourced, and it can be
                                used by anyone with their own cloud instances. It contains login and
                                registration for framework and parser for mapping cloud based rule engines.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomeHero;