import React from 'react';

import './BookingItem.css';

const bookingItem = props => (
    <li className="list-item">
        <div>
            <h3>{props.title}</h3>
            <span>{props.subtitle}</span>
        </div>
        <button onClick={props.cancelBooking.bind(this, props.bookingId)} className="btn">Cancel</button>
    </li>
);

export default bookingItem;