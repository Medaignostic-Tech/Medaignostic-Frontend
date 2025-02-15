import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import bgPic from "../assets/medp3.jpg"
import UserNavbar from './UserNavbar';
import MainForm from './MainForm';
import OrganForm from './OrganForm';

function UploadReports() {
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

    const [forms, setForms] = useState([]);
    const [formId, setFormId] = useState(0);
    const [mainForms, setMainForms] = useState(new FormData());

    const updateForm = (e) => {
        let key = e.target.form.name + "_" + e.target.name;
        let value;
        if (e.target.type === "file") {
            value = e.target.files[0];
        }
        else {
            value = e.target.value;
        }
        mainForms.append(key, value);
    }
    
    const addForm = () => {
        const newId = formId + 1;
        setFormId(newId);
        setForms([
            ...forms,
            {
                formId: formId
            }
        ]);
    };

    const deleteForm = () => {
        const updatedItems = forms.concat();
        updatedItems.pop();
        setForms(updatedItems);
        if (formId > 0) {
            const newId = formId - 1;
            setFormId(newId);
        } 
    };

    const submitForm = async () => {
        loginNavigate("/report", {replace:true, state:{"mainForms": Object.fromEntries(mainForms)}});
        loginNavigate(0);
    };
    
    return (
        <div className="bg-background">
            <UserNavbar />
            <Container fluid className="jumbotron text-white text-center" style={{ marginBottom: '20px' }}>
                <Row>
                    <Col>
                        <h1 className="display-3">Upload Reports</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="lead">Kindly upload your medical reports using add report button</p>
                    </Col>
                </Row>
            </Container>
            <div><OrganForm setForm={ updateForm } organ="general" /></div>
            {forms.map((form, index) => {
                return <MainForm setForm={ updateForm } />
            })}

        <Button style={{ width: '95%', marginBottom: '20px', fontSize: '40px' }} variant="secondary" onClick={() => addForm()} size="lg">+</Button>
        <Button style={{ width: '95%', marginBottom: '20px', fontSize: '40px' }} variant="secondary" onClick={() => deleteForm()} size="lg">-</Button>
        <Button style={{ width: '95%', marginBottom: '20px', fontSize: '40px' }} variant="secondary" onClick={() => submitForm()} size="lg">Submit</Button>
        </div>
    );
}

export default UploadReports;