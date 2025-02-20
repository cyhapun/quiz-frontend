import { Link } from "react-router-dom";
import "./error404.scss"
function Error404() {

    return (
        <>
            <div class="error-container">
                <h1> 404 </h1>
                <p>
                    Oops! The page you're
                    looking for is not here.
                </p>
                <Link to="/">
                    Go Back to Home
                </Link>
            </div>
        </>
    );
};

export default Error404;