import React from 'react';

import './Modal.css';

const Modal = props => (
    <React.Fragment>
        <div className="modal-container">
            <header>{props.title}</header>
            <section className="modal-content">
                {props.children}
            </section>
            {(props.isCancel || props.isSave) && <section className="modal-footer">
                {props.isCancel && <button className="btn" onClick={props.onCancel}>Cancel</button>}
                {props.isSave && <button className="btn" onClick={props.onSave}>Save</button>}
            </section>}
        </div>
        <div className="backdrop"></div>
    </React.Fragment>
);

export default Modal;