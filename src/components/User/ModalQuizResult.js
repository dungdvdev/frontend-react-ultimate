import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalQuizResult({ show, setShow, dataModal }) {
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Question: <b>{dataModal.countTotal}</b></div>
                    <div>Total Correct answers: <b>{dataModal.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show answers
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalQuizResult;