import React, { Component } from 'react';

import Modal from './modal/Modal';
import AuthContext from '../context/auth-context';
import CardsContainer from '../cmp/events/CardsContainer';
import Spinner from '../cmp/Spinner/Spinner';

import './events.css';

class EventsCmp extends Component {

    state = {
        showEventModal: false,
        events: [],
        isLoading: false,
        selectedEvent: null
    };

    isCmpMounted = true;

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.titleElm = React.createRef();
        this.priceElm = React.createRef();
        this.dateElm = React.createRef();
        this.descElm = React.createRef();
    }

    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents = () => {
        this.setState({ isLoading: true });
        const reqBody = {
            query: `
                query {
                    events {
                        _id
                        title
                        price
                        description
                        date
                        created_by {
                            _id
                            email
                        }
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
                throw new Error('get events failed!');
            }
            return res.json();
        })
        .then(data => {

            if (this.isCmpMounted) {
                this.setState({ events: data.data.events });
                this.setState({ isLoading: false });
            }
        })
        .catch(err => {

            if (this.isCmpMounted) {
                console.log(err);
                this.setState({ isLoading: false });
            }
        });
    }

    createEvent = () => {
        this.setState({ showEventModal: true });
    }

    cancelEvent = () => {
        this.setState({ showEventModal: false, selectedEvent: null });
    }

    saveEvent = () => {
        this.setState({ showEventModal: false });
        const newEvent = {
            title: this.titleElm.current.value,
            price: +this.priceElm.current.value,
            date: this.dateElm.current.value,
            description: this.descElm.current.value
        };

        const reqBody = {
            query: `
                mutation {
                    createEvent(evInput: {
                            title: "${newEvent.title}",
                            price: ${newEvent.price},
                            date: "${newEvent.date}",
                            description: "${newEvent.description}"
                        }) {
                        _id
                        title
                        price
                        description
                        date
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
                throw new Error('event creation failed!');
            }
            return res.json();
        })
        .then(data => {
            this.setState(prevState => {
                const updatedEvents = [...prevState.events];
                updatedEvents.push({
                    _id: data.data.createEvent._id,
                    title: data.data.createEvent.title,
                    price: data.data.createEvent.price,
                    description: data.data.createEvent.description,
                    date: data.data.createEvent.date,
                    created_by: {
                        _id: this.context.userId
                    }
                });
                return { events: updatedEvents };
            });
        })
        .catch(err => console.log(err));
    }

    showEventDetails = eventId => {
        this.setState(prevState => {
            const selectedEv = prevState.events.find(ev => ev._id === eventId);
            return { selectedEvent: selectedEv };
        });
    }

    bookEvent = () => {
        const reqBody = {
            query: `
                mutation {
                    bookEvent(eventId: "${this.state.selectedEvent._id}") {
                        _id
                        createdAt
                        updatedAt
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
                throw new Error('event creation failed!');
            }
            return res.json();
        })
        .then(data => {
            this.cancelEvent();
        })
        .catch(err => console.log(err));
    }

    componentWillUnmount() {
        this.isCmpMounted = false;
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.showEventModal &&
                    <Modal title="Add Event"
                            isCancel isSave
                            onCancel={this.cancelEvent}
                            onSave={this.saveEvent}
                            cancelLabel="Cancel"
                            submitLabel="Save">
                        <form>
                            <div className="form-element">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" ref={this.titleElm} />
                            </div>
                            <div className="form-element">
                                <label htmlFor="price">Price</label>
                                <input type="number" id="price" ref={this.priceElm} />
                            </div>
                            <div className="form-element">
                                <label htmlFor="date">Date</label>
                                <input type="datetime-local" id="date" ref={this.dateElm} />
                            </div>
                            <div className="form-element">
                                <label htmlFor="desc">Description</label>
                                <textarea id="desc" rows="3" ref={this.descElm}></textarea>
                            </div>
                        </form>
                    </Modal>
                }
                {
                    this.context.token &&
                    <div className="btn-container">
                        <p>Publish a new event!</p>
                        <button className="btn" onClick={this.createEvent}>Create Event</button>
                    </div>
                }
                {
                    this.state.selectedEvent &&
                    <Modal title={this.state.selectedEvent.title}
                            isCancel isSave
                            onCancel={this.cancelEvent}
                            onSave={this.bookEvent}
                            cancelLabel="Close"
                            submitLabel="Book Event">
                        <h1>{this.state.selectedEvent.title}</h1>
                        <p>{this.state.selectedEvent.description}</p>
                    </Modal>
                }
                {
                    this.state.isLoading
                    ? <Spinner />
                    : <CardsContainer showDetails={this.showEventDetails}
                            userId={this.context.userId} events={this.state.events} />
                }
            </React.Fragment>
        )
    }
}

export default EventsCmp;