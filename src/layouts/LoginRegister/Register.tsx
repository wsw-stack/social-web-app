import { Link } from "react-router-dom"
import { Footer } from "../NavbarAndFooter/Footer"
import { Introduction } from "./Components/Introduction"
import { RegisterForm } from "./Components/RegisterForm"

export const Register = () => {
    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <div className="row flex-grow-1 justify-content-center align-items-center">
                <RegisterForm />
            </div>
            <Footer />
        </div>
    )
}