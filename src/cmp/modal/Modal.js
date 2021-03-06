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
                {props.isCancel && <button className="btn" onClick={props.onCancel}>{props.cancelLabel}</button>}
                {props.isSave && <button className="btn btn-primary" onClick={props.onSave}>{props.submitLabel}</button>}
            </section>}
        </div>
        <div className="backdrop"></div>
    </React.Fragment>
);

export default Modal;