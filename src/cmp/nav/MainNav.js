import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';

import './MainNav.css';

const MainNav = props => (
    <AuthContext.Consumer>
        {context => {
            return <header className="nav-header">
                    <div className="nav-logo">
                        <h2>React Events</h2>
                    </div>
                    <nav className="navbar">
                        <ul>
                            {!context.token && <li><NavLink to="/auth">Login</NavLink></li>}
                            <li><NavLink to="/events">Events</NavLink></li>
                            {context.token && <li><NavLink to="/bookings">Bookings</NavLink></li>}
                        </ul>
                    </nav>
                </header>
        }}
    </AuthContext.Consumer>
);

export default MainNav;