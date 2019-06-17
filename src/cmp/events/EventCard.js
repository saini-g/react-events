import React from 'react';

import './EventCard.css';

const itemCard = props => (
    <div className="event-card">
        <div className="card-header">{props.event.title}</div>
        <p>{props.event.description}</p>
        {
            props.userId === props.event.created_by._id ?
            '' : <div className="card-footer">
                <button onClick={props.viewDetails.bind(this, props.event._id)} className="btn btn-primary">
                    View Details
                </button>
            </div>
        }
    </div>
);

export default itemCard;