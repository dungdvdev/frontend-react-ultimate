import { useEffect, useState } from "react";
import { getAllUsers } from '../../services/apiService';

import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import TableUser from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

function ManageUser() {
    const [listUsers, setListUsers] = useState([]);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    useEffect(() => {
        fetchListAllUsers()
    }, [])
    const fetchListAllUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const handleClickViewUpdate = (user) => {
        setShowModalViewUser(true);
        setDataUpdate(user);
    }

    const handleDeleteUser = (user) => {
        setShowModalDeleteUser(true);
        setDataUpdate(user);
    }

    const restUpdateData = () => {
        setDataUpdate({});
    }

    return (
        <>
            <div className="manage-user-container">
                <div className="title"><h4>Manage User</h4></div>
                <div className="users-content">
                    <ModalCreateUser fetchListAllUsers={fetchListAllUsers} />
                    <div className="table-users-container">
                        <TableUser
                            listUsers={listUsers}
                            handleClickBtnUpdate={handleClickBtnUpdate}
                            handleClickViewUpdate={handleClickViewUpdate}
                            handleDeleteUser={handleDeleteUser}
                        />
                    </div>
                    <ModalUpdateUser
                        show={showModalUpdateUser}
                        setShowModalUpdateUser={setShowModalUpdateUser}
                        fetchListAllUsers={fetchListAllUsers}
                        dataUpdate={dataUpdate}
                        restUpdateData={restUpdateData}
                    />
                    <ModalViewUser
                        show={showModalViewUser}
                        setShowModalViewUser={setShowModalViewUser}
                        dataUpdate={dataUpdate}
                        restUpdateData={restUpdateData}
                    />
                    <ModalDeleteUser
                        show={showModalDeleteUser}
                        setShowModalDeleteUser={setShowModalDeleteUser}
                        fetchListAllUsers={fetchListAllUsers}
                        dataUpdate={dataUpdate}
                        restUpdateData={restUpdateData}
                    />
                </div>
            </div>
        </>
    );
}

export default ManageUser;