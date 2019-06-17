import React, { Component } from 'react';

import AuthContext from '../context/auth-context';
import Spinner from '../cmp/Spinner/Spinner';
import BookingList from '../cmp/bookings/BookingList';

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
                        user {
                            _id
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
            debugger;
            const currentUserBookings
                = data.data.bookings.filter(booking => booking.user._id === this.context.userId);

            this.setState({ bookings: currentUserBookings });
            this.setState({ isLoading: false });
        })
        .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    cancelBookingHandler = bookingId => {
        console.log('cancel booking clicked', bookingId);
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isLoading
                    ? <Spinner />
                    : <BookingList bookings={this.state.bookings} cancelHandler={this.cancelBookingHandler} />
                }
            </React.Fragment>
        )
    }
}

export default BookingsCmp;