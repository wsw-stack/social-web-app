import { Footer } from "../NavbarAndFooter/Footer"
import { Introduction } from "./Components/Introduction"
import { LoginForm } from "./Components/LoginForm"

export const Login = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-dark">
            <div className="container d-flex justify-content-center align-items-center flex-grow-1">
                <div className="d-flex">
                    <LoginForm />
                </div>
            </div>
            <Footer />
        </div>
    )
}