import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const response: any = await fetch(
                "http://localhost:8000/api/sessions",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const responseData = await response.json();
            if (responseData.session) {
                const userId = JSON.parse(responseData.session.session).user;
                setLoggedUser(userId);
            }
        };
        fetchCurrentUser();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top mb-2">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">
                    Poster
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                All Latest Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/following">
                                Following Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/new">
                                Create New Post
                            </Link>
                        </li>
                    </ul>
                    {loggedUser == null ? (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={`/profile/${loggedUser}`}>
                                    My Profile
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};
