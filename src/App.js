import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthCmp from './cmp/auth';
import EventsCmp from './cmp/events';
import BookingsCmp from './cmp/bookings';
import MainNav from './cmp/nav/MainNav';

import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {

    state = { token: null, userId: null };

    login = (token, userId, expiration) => {
        this.setState({ token: token, userId: userId });
    }

    logout = () => {
        this.setState({ token: null, userId: null });
    }

    render() {
        return <BrowserRouter>
                <React.Fragment>
                    <AuthContext.Provider value={{
                            token: this.state.token,
                            userId: this.state.userId,
                            login: this.login,
                            logout: this.logout
                        }}>
                        <MainNav />
                        <main className="main-container">
                            <Switch>
                                {this.state.token && <Redirect from="/" to="/events" exact />}
                                {this.state.token && <Redirect from="/auth" to="/events" exact />}
                                {!this.state.token && <Route path="/auth" component={AuthCmp} />}
                                <Route path="/events" component={EventsCmp} />
                                {this.state.token && <Route path="/bookings" component={BookingsCmp} />}
                                {!this.state.token && <Redirect to="/auth" exact />}
                            </Switch>
                        </main>
                    </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
    }
}

export default App;