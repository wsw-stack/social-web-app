import { useState, useEffect } from "react";
import "../../App.css";
import { Footer } from "../NavbarAndFooter/Footer";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../NavbarAndFooter/Navbar";

export const NewPost = () => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

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
            } else {
                navigate("/login");
            }
        };
        fetchCurrentUser();
    }, []);

    const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response: any = await fetch("http://localhost:8000/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: loggedUser,
                content: content,
            }),
        });
        const responseData = await response.json();
        if (responseData.success) {
            alert("Posted successfully");
            navigate('/')
        } else {
            alert("An error occured");
        }
    };

    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <Navbar />
            <div className="row flex-grow-1 justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="d-flex justify-content-center">
                        <h3 className="card-title text-white">
                            Create a New Post
                        </h3>
                    </div>
                    <form onSubmit={submitPost}>
                        <div className="mb-3">
                            <div className="col-6 offset-3">
                                <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label"
                                >
                                    Example textarea
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows={6}
                                    placeholder="Post your feelings here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn mt-3 text-light border-light fw-bold"
                                        style={{ borderWidth: "2px" }}
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};
