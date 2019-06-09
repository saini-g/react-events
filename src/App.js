import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthCmp from './cmp/auth';
import EventsCmp from './cmp/events';
import BookingsCmp from './cmp/bookings';
import MainNav from './cmp/nav/MainNav';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <MainNav />
                <main className="main-container">
                    <Switch>
                        <Redirect from="/" to="/auth" exact />
                        <Route path="/auth" component={AuthCmp} />
                        <Route path="/events" component={EventsCmp} />
                        <Route path="/bookings" component={BookingsCmp} />
                    </Switch>
                </main>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;