import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Navbar = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
    }
    let location = useLocation();
    React.useEffect(() => {
        // Google Analytics
    }, [location]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')? <form className="d-flex">
                        <Link className="btn btn-primary mx-1"  to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1"  to="/signUp" role="button">Sign up</Link>
                        </form> : <Link className="btn btn-primary mx-1"  to="/login" onClick={handleLogout} role="button">Logout</Link>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
