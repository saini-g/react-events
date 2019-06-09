import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthCmp from './cmp/auth';
import EventsCmp from './cmp/events';
import BookingsCmp from './cmp/bookings';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect from="/" to="/auth" exact />
                <Route path="/auth" component={AuthCmp} />
                <Route path="/events" component={EventsCmp} />
                <Route path="/bookings" component={BookingsCmp} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;