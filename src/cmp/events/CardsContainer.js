import React from 'react';

import EventCard from './EventCard';

import './CardsContainer.css';

const cardsContainer = props => {
    const eventsList = props.events.map(ev => {
        return <EventCard key={ev._id}
                    userId={props.userId}
                    viewDetails={props.showDetails}
                    event={ev} />;
    });

    return <div className="cards-container">
        {eventsList}
    </div>;
}

export default cardsContainer;