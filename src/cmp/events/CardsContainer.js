import React from 'react';

import EventCard from './EventCard';

import './CardsContainer.css';

const cardsContainer = props => {
    const eventsList = props.events.map(ev => <EventCard key={ev._id} userId={props.userId} event={ev} />);

    return <div className="cards-container">
        {eventsList}
    </div>;
}

export default cardsContainer;