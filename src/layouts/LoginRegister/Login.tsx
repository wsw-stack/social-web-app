import { Link } from "react-router-dom"
import { Footer } from "../NavbarAndFooter/Footer"
import { Introduction } from "./Components/Introduction"
import { LoginForm } from "./Components/LoginForm"

export const Login = () => {
    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <div className="row flex-grow-1 justify-content-center align-items-center">
                <LoginForm />
            </div>
            <Footer />
        </div>
    )
}