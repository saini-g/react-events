import React from 'react';

import BookingItem from './BookingItem';

import './BookingList.css';

const bookingList = props => {
    const bookings = props.bookings.map(booking => {
        return <BookingItem key={booking._id}
                    title={booking.event.title}
                    subtitle={booking.event.date}
                    cancelBooking={props.cancelHandler}
                    bookingId={booking._id} />;
    });

    return <ul className="list-container">
        {bookings}
    </ul>;
}

export default bookingList;