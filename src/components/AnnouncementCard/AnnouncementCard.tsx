import React, { useState } from 'react';
import './AnnouncementCard.css';
import Modals from '../Modal/Modals';

export default function AnnouncementCard(props: any) {
    const [modalShow, setModalShow] = useState(false);
    const [read, setRead] = useState(false);

    const handleRead = () => {
        setRead(true);
    };

    return (
        <div className={`announcement-card-content  ${read ? 'read' : ''}`}>
            <div className='content col-md-4'>
                <div className='announcement-header'>
                    <span>{props.announcementTypeName}</span>
                    <span>{props.projectName}</span>
                </div>
                <div className='announcement-name'>
                    <span>{props.announcementName}</span>
                </div>
                <div className='announcement-footer'>
                    <span>{props.announcementDate}</span>
                    <span onClick={() => { setModalShow(true); handleRead(); }}>Devamını Oku</span>
                </div>
            </div>
            <Modals
                header={true}
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={props.projectName}
                body={props.announcementDescription}
            />
        </div>
    );
}
