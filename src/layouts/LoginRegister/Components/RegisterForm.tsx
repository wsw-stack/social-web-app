import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterForm = () => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({
        email: "",
        username: "",
        password: "",
    })
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedField = e.target.name;
        const newValue = e.target.value;
        setFormData((oldFormData) => {
            oldFormData[changedField] = newValue;
            return { ...oldFormData };
        });
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response: any = await fetch(
            "http://localhost:8000/api/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        )
        const responseData = await response.json()
        if(!response.ok) {
            setMessage(responseData.message)
            setMessageType('alert-danger')
        } else {
            console.log(responseData.message)
            setMessage(responseData.message)
            setMessageType('alert-success')
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    };

    return (
        <div className="col-md-6">
            {message && <div
                className={`alert ${messageType} alert-dismissible fade show`}
                role="alert"
            >
                {message}
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
            </div>}
            <form onSubmit={submitForm}>
                <div className="card bg-dark border-white">
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <h3 className="card-title text-white">Register</h3>
                        </div>
                        <div className="m-3">
                            <label
                                htmlFor="email"
                                className="form-label text-white fs-5"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                required
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                        <div className="m-3">
                            <label
                                htmlFor="username"
                                className="form-label text-white fs-5"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                required
                                onChange={handleChange}
                                value={formData.username}
                            />
                        </div>
                        <div className="m-3">
                            <label
                                htmlFor="password"
                                className="form-label text-white fs-5"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                required
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/login" className="fw-bold">
                                Already have an account? Click here to login.
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn mt-3 text-light border-light fw-bold"
                                style={{ borderWidth: "2px" }}
                            >
                                Create New Account
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
