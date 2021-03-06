import React, { Component } from 'react';

import './auth.css';

import AuthContext from '../context/auth-context';

class AuthCmp extends Component {

    state = {
        isLogin: true
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailElm = React.createRef();
        this.passwordElm = React.createRef();
    }

    submitHandler = event => {
        event.preventDefault();
        const email = this.emailElm.current.value;
        const password = this.passwordElm.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        let reqBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        expiresIn
                    }
                }
            `
        };

        if (!this.state.isLogin) {
            reqBody = {
                query: `
                    mutation {
                        createUser(userInput: { email: "${email}", password: "${password}" }) {
                            _id
                            email
                        }
                    }
                `
            };
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
        .then(res => {

            if (res.status !== 200 && res.status !== 201) {
                throw new Error('auth failed!');
            }
            return res.json();
        })
        .then(data => {

            if (this.state.isLogin && data.data.login.token) {
                this.context.login(data.data.login.token, data.data.login.userId, data.data.login.expiresIn);
            }
        })
        .catch(err => console.log(err));
    }

    toggleLogin = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin };
        });
    }

    render() {
        return <form onSubmit={this.submitHandler}>
            <div className="form-element">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={this.emailElm} />
            </div>
            <div className="form-element">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordElm} />
            </div>
            <div className="form-footer">
                <button className="btn" type="button" onClick={this.toggleLogin}>Switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    }
}

export default AuthCmp;