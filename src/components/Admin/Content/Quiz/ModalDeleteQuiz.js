import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/apiService';

function ModalDeleteQuiz({ show, setShowModalDelete, dataUpdate }) {
    const handleClose = () => setShowModalDelete(false);

    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuiz(dataUpdate.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // setCurrentPage(1);
            // await fetchListUsersWithnPaginate(1);
        }
        if (data.EC !== 0) {
            toast.error(data.EM)
        }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this ID: <b>{dataUpdate.id}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDeleteQuiz() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;