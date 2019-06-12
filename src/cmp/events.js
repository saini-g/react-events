import React, { Component } from 'react';

import Modal from './modal/Modal';

import './events.css'

class EventsCmp extends Component {

    state = { showEventModal: false };

    createEvent = () => {
        this.setState({ showEventModal: true });
    }
    
    cancelEvent = () => {
        this.setState({ showEventModal: false });
    }
    
    saveEvent = () => {
        this.setState({ showEventModal: false });
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.showEventModal &&
                    <Modal title="Add Event" isCancel isSave onCancel={this.cancelEvent} onSave={this.saveEvent}>
                        <p>Modal content!</p>
                    </Modal>
                }
                <div className="btn-container">
                    <p>Create your own event!</p>
                    <button className="btn" onClick={this.createEvent}>Create Event</button>
                </div>
            </React.Fragment>
        )
    }
}

export default EventsCmp;