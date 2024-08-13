import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInformation from './UserInformation';
import ChangePassword from './ChangePassword';
import History from './History';

function ModalManageUser({ showModal, setShowModal, dataUpdate }) {
    const handleClose = () => setShowModal(false);

    return (
        <>
            <Modal
                size="lg"
                show={showModal}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Manage User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="form"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="form" title="User Information">
                            <UserInformation />
                        </Tab>
                        <Tab eventKey="password" title="Change Password">
                            <ChangePassword />
                        </Tab>
                        <Tab eventKey="history" title="History">
                            <History />
                        </Tab>
                    </Tabs>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalManageUser;