import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNav.css';

const MainNav = props => (
    <header className="nav-header">
        <div className="nav-logo">
            <h3>React Events</h3>
        </div>
        <nav className="navbar">
            <ul>
                <li><NavLink to="/auth">Signup</NavLink></li>
                <li><NavLink to="/events">Events</NavLink></li>
                <li><NavLink to="/bookings">Bookings</NavLink></li>
            </ul>
        </nav>
    </header>
);

export default MainNav;