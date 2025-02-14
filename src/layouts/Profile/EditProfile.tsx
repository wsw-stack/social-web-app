import { useEffect, useState } from "react";
import { Navbar } from "../NavbarAndFooter/Navbar";
import { fetchCurrentUser } from "../../common";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";

export const EditProfile = () => {
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState(null);
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
        const changedField = e.target.name
        const newValue = e.target.value
        // console.log(changedField, ' ', newValue)
        setUserDetails(prevData => ({
            ...prevData,
            [changedField]: newValue, 
        }))
    }

    const submitChange = async () => {
        
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
                            id="exampleFormControlTextarea1"
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
