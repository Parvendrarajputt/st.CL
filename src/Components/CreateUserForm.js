import React, { useState } from "react";
import axios from "axios";

const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        Name: "",
        RollNumber: "",
        Birthday: "",
        Address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/api/users", formData);
            alert("User created successfully!");

            setFormData({
                Name: "",
                RollNumber: "",
                Birthday: "",
                Address: "",
            });
        } catch (error) {
            console.error("Error creating user:", error);
            alert("There was an error creating the user.");
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Name">Name:</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="RollNumber">Roll Number:</label>
                    <input
                        type="number"
                        id="RollNumber"
                        name="RollNumber"
                        value={formData.RollNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Birthday">Birthday:</label>
                    <input
                        type="date"
                        id="Birthday"
                        name="Birthday"
                        value={formData.Birthday}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Address">Address:</label>
                    <input
                        type="text"
                        id="Address"
                        name="Address"
                        value={formData.Address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUserForm;
