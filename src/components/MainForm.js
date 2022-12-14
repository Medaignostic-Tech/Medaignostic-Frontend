import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import OrganForm from './OrganForm';
import auth from "../utils/auth";

function MainForm(props) {
    const [form, setForm] = useState(null);
    const loginNavigate = useNavigate();

    const [response, setResponse] = useState([]);

    const handleSelect = (eventKey) => {
        setForm(<div><OrganForm setForm={props.setForm} organ={eventKey} /></div>);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (auth.isAuthenticated()) {
                const result = await auth.getOrgans();
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
        <Form>
            <DropdownButton
                variant="dark"
                menuVariant="dark"
                title="Dropdown Menu"
                style={{ marginBottom: '20px' }}
                onSelect={handleSelect}
                size="lg"
            >
                {response.map((organ, index) => (
                    <Dropdown.Item eventKey={organ}>{organ.charAt(0).toUpperCase() + organ.slice(1)}</Dropdown.Item>
                ))}
            </DropdownButton>
            {form && (
                <div>
                {form}
                </div>
            )}
        </Form>
    );
}

export default MainForm;