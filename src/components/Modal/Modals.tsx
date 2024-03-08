import Modal from 'react-bootstrap/Modal';
import "./Modals.css";

function Modals(props: any) {
    const handleClose = () => {
        props.onHide();
    };

    return (
        <div>
            <Modal className={props.className} show={props.show} onHide={handleClose}>
                <Modal.Header closeButton style={props.header ? { display: 'block' } : { display: 'none' }}>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body> {props.body}</Modal.Body>
                <Modal.Footer style={props.footerShow ? { display: 'block' } : { display: 'none' }}>
                    {props.footer}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Modals;


//examDetails = title