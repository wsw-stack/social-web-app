import { useEffect, useState } from "react";
import { Navbar } from "../NavbarAndFooter/Navbar";
import { fetchCurrentUser } from "../../common";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState(null);
    useEffect(() => {
        const getCurrentUser = async () => {
            const sessionUser = await fetchCurrentUser();
            setLoggedUser(sessionUser);
        };
        getCurrentUser();
    });
    if (loggedUser === null) {
        navigate("/login");
    }
    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <Navbar />
            <div className="col-6 offset-3 text-white">
                <div className="d-flex justify-content-center">
                    <h2>Edit Profile</h2>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            New Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            // placeholder="name@example.com"
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                        >
                            Example textarea
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn mt-3 text-light border-light fw-bold"
                                style={{ borderWidth: "2px" }}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
