import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedField = e.target.name;
        const newValue = e.target.value;
        setFormData((oldFormData) => {
            oldFormData[changedField] = newValue;
            return { ...oldFormData };
        });
    };

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response: any = await fetch(
            "http://localhost:8000/api/users/login",
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
            setMessage(responseData.message)
            setMessageType('alert-success')
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }

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
            <form onSubmit={login}>
                <div className="card bg-dark border-white">
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <h3 className="card-title text-white">Login</h3>
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
                                placeholder="name@example.com"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="m-3">
                            <label
                                htmlFor="exampleFormControlInput2"
                                className="form-label text-white fs-5"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/register" className="fw-bold">
                                Don't have an account yet? Click here to
                                register.
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn mt-3 text-light border-light fw-bold"
                                style={{ borderWidth: "2px" }}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
