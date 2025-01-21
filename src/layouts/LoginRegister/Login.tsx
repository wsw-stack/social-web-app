import { Footer } from "../NavbarAndFooter/Footer"
import { Introduction } from "./Components/Introduction"
import { LoginForm } from "./Components/LoginForm"

export const Login = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-dark">
            <div className="row flex-grow-1 justify-content-center align-items-center">
                <LoginForm />
            </div>
            <Footer />
        </div>
    )
}