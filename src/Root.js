import { Outlet, NavLink } from "react-router-dom";

export function Root() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
                <div className="container">
                    <span className="navbar-brand">E-Commerce Example</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse flex-grow-0" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className='nav-link'
                            aria-current={({isActive}) => isActive ? 'true' : 'false'}
                            to="/">Products</NavLink>
                        <NavLink className='nav-link'
                            aria-current={({isActive}) => isActive ? 'true' : 'false'}
                            to="/cart">Cart</NavLink>
                    </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}