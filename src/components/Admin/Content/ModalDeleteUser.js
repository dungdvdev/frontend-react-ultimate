import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../services/apiService';

function ModalDeleteUser({ show, setShowModalDeleteUser, dataUpdate, setCurrentPage, fetchListUsersWithnPaginate }) {
    const handleClose = () => setShowModalDeleteUser(false);

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataUpdate.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await fetchListAllUsers();
            setCurrentPage(1);
            await fetchListUsersWithnPaginate(1);
        }
        if (data.EC !== 0) {
            toast.error(data.EM)
        }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user <b>{dataUpdate.email}</b>!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDeleteUser() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;