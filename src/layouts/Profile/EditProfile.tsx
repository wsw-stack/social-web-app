import { useEffect, useState } from "react";
import { Navbar } from "../NavbarAndFooter/Navbar";
import { fetchCurrentUser } from "../../common";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";

export const EditProfile = () => {
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [userDetails, setUserDetails] = useState<User>({
        _id: '',
        username: '',
        email: '',
        following: [],
        followers: [],
        introduction: ''
    });

    const getUserDetail = async () => {
        const sessionUser = await fetchCurrentUser();
        setLoggedUser(sessionUser);
        if (sessionUser === null) {
            return navigate("/login");
        }
        const response = await fetch(`http://localhost:8000/api/users/${sessionUser}`);
        const responseData = await response.json();

        if (!responseData.error) {
            setUserDetails(responseData);
        }
    };
    useEffect(() => {
        getUserDetail();
    }, [loggedUser]);

    const handleChange = (e: any) => {
        setUserDetails((currData) => {
            return {
                ...currData,
                [e.target.name]: e.target.value
            }
        })
    }

    const submitChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (loggedUser === null) {
            return navigate('/login')
        }
        const response = await fetch(`http://localhost:8000/api/users/${loggedUser}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        })
        const responseData = await response.json()
        if (responseData.success) {
            setMessage(responseData.success)
            setMessageType('alert-success')
            setTimeout(() => {
                navigate(`/profile/${loggedUser}`)
            }, 2000);
        } else {
            setMessage(responseData.error)
            setMessageType('alert-danger')
        }
    }

    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <Navbar />
            <div className="col-6 offset-3 text-white">
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
                <div className="d-flex justify-content-center">
                    <h2>Edit Profile</h2>
                </div>
                <form onSubmit={submitChange}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            New Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={userDetails?.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                        >
                            Personal Introduction (Optional)
                        </label>
                        <textarea
                            className="form-control"
                            id="introduction"
                            name="introduction"
                            rows={3}
                            value={userDetails?.introduction}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn mt-3 text-light border-light fw-bold"
                            style={{ borderWidth: "2px" }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
