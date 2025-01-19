import { useNavigate, useParams } from "react-router-dom"
import { ProfileNavBar } from "./ProfileNavBar"
import { PersonalProfile } from "./PersonalProfile"
import { Navbar } from "../NavbarAndFooter/Navbar";
import { useEffect, useState } from "react";

export const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [user, setUser] = useState({
        username: '',
        introduction: ''
    })
    useEffect(() => {
        const getCurUser = async (id: any) => {
            const response = await fetch(`http://localhost:8000/api/users/${id}`)
            const responseData = await response.json()
            const newUser = {
                username: responseData.username,
                introduction: responseData.introduction
            }
            setUser(newUser)
        }
        getCurUser(id)
    }, [id])

    return (
        <div className="d-flex flex-column bg-dark">
            <Navbar />
            <div className="col-md-6 offset-md-3 border min-vh-100">
                <PersonalProfile username={user.username} introduction={user.introduction}/>
                <ProfileNavBar id={id + "/" || ""} curPage='profile' />
                <div className="card">
                    <div className="card-body bg-dark">
                        <p className="card-title text-white fw-bold">
                            Routers <span className="card-subtitle mb-2 text-secondary">10min ago</span>
                        </p>
                        <p className="card-text text-white">
                            Swedish teenager Lucas Bergvall opened his Tottenham Hotspur account in thrilling fashion with the winner in Wednesday's League Cup semi-final first leg but should not even have been on the pitch according to Liverpool captain Virgil van Dijk.
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                            <button
                                className='btn btn-sm btn-secondary'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill me-1" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                </svg>
                                2
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={() => navigate(`/detail/1`)}>View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

