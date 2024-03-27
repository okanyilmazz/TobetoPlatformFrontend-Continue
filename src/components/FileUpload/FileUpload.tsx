import Uppy from '@uppy/core';
import { useEffect, useState } from 'react';
import Modals from '../../components/Modal/Modals';
import { Dashboard } from '@uppy/react';
import './FileUpload.css';
import { useSelector } from 'react-redux';


export default function FileUpload(props: any) {

    const userState = useSelector((state: any) => state.user);

    const uppy = new Uppy({
        autoProceed: false,
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ['.jpg', '.jpeg', '.png'],
        }
    });


    useEffect(() => {
        uppy.on('complete', async (response) => {
            const file = response.successful[0];
            const formData = new FormData();
            formData.append('file', file.data);
            formData.append('id', userState.user.id);
            props.onDataFromFileUpload(formData);
            props.setShowModal(false);
        });
    }, [uppy]);


    const handleCloseUploadModal = () => {
        props.setShowModal(false);
    };
    return (
        <div className='upload-page container'>

            <div className='upload-content'>
                <div className='upload-area'>

                    <div>
                        <Modals
                            className="certificate-modal"
                            header={false}
                            footer={false}
                            show={props.showModal}
                            onHide={handleCloseUploadModal}
                            body={
                                <Dashboard
                                    showSelectedFiles={true}
                                    showProgressDetails={true}
                                    uppy={uppy}
                                    plugins={['FileInput']} />
                            } />
                    </div>
                </div>
            </div>
        </div>
    )
}
