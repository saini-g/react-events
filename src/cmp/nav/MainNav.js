import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNav.css';

const MainNav = props => (
    <header className="nav-header">
        <div className="nav-logo">
            <h2>React Events</h2>
        </div>
        <nav className="navbar">
            <ul>
                <li><NavLink to="/auth">Login</NavLink></li>
                <li><NavLink to="/events">Events</NavLink></li>
                <li><NavLink to="/bookings">Bookings</NavLink></li>
            </ul>
        </nav>
    </header>
);

export default MainNav;