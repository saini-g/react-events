import React, { Component } from 'react';

import AuthContext from '../context/auth-context';
import Spinner from '../cmp/Spinner/Spinner';

import './bookings.css';

class BookingsCmp extends Component {
    state = {
        bookings: [],
        isLoading: false,
    };

    static contextType = AuthContext;

    componentDidMount() {
        this.fetchBookings();
    }

    fetchBookings = () => {
        this.setState({ isLoading: true });
        const reqBody = {
            query: `
                query {
                    bookings {
                        _id
                        createdAt
                        event {
                            _id
                            title
                            date
                        }
                    }
                }
            `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.token}`
            },
            body: JSON.stringify(reqBody)
        })
        .then(res => {

            if (res.status !== 200 && res.status !== 201) {
                throw new Error('get bookings failed!');
            }
            return res.json();
        })
        .then(data => {
            this.setState({ bookings: data.data.bookings });
            this.setState({ isLoading: false });
        })
        .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isLoading
                    ? <Spinner />
                    : <ul>
                        {this.state.bookings.map(booking => {
                            return <li key={booking._id}>
                                {booking.event.title} - {booking.event.date}
                            </li>;
                        })}
                    </ul>
                }
            </React.Fragment>
        )
    }
}

export default BookingsCmp;