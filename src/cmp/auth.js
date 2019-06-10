import React, { Component } from 'react';

import './auth.css';

class AuthCmp extends Component {

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
        const reqBody = {
            query: `
                mutation {
                    createUser(userInput: {
                        email: "${email}",
                        password: "${password}"
                    }) {
                        _id
                        email
                    }
                }
            `
        };

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
            console.log(data);
        })
        .catch(err => console.log(err));
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
                <button type="button">Login</button>
                <button type="submit">Signup</button>
            </div>
        </form>
    }
}

export default AuthCmp;