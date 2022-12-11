import React, { useState } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import LungsForm from './LungsForm';

function MainForm() {
    const [form, setForm] = useState(null);

    const handleSelect = (eventKey) => {
        if (eventKey === "lungs") {
            setForm(<div><LungsForm /></div>);
        }
        else if (eventKey === "brain") {
            setForm(<div>Brain</div>); // Add Brain Form here
        }
        else if (eventKey === "skin") {
            setForm(<div>Skin</div>); // Add Skin Form here
        }
    }

    return (
        <div>
            <DropdownButton
                variant="dark"
                menuVariant="dark"
                title="Dropdown Menu"
                style={{ marginBottom: '20px' }}
                onSelect={handleSelect}
                size="lg"
            >
                <Dropdown.Item eventKey="lungs" variant="danger">Lungs</Dropdown.Item>
                <Dropdown.Item eventKey="brain">Brain</Dropdown.Item>
                <Dropdown.Item eventKey="skin">Skin</Dropdown.Item>
            </DropdownButton>
            {form && (
                <Form>
                {form}
                </Form>
            )}
        </div>
    );
}

export default MainForm;