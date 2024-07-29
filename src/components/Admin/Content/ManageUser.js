import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from '../../services/apiService';

import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

function ManageUser() {
    const LIMIT_USER = 5;
    const [listUsers, setListUsers] = useState([]);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // fetchListAllUsers()
        fetchListUsersWithnPaginate(1)
    }, [])

    const fetchListAllUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    }

    const fetchListUsersWithnPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
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
        setCurrentPage(currentPage);
    }

    const restUpdateData = () => {
        setDataUpdate({});
    }

    return (
        <>
            <div className="manage-user-container">
                <div className="title"><h4>Manage User</h4></div>
                <div className="users-content">
                    <ModalCreateUser
                        fetchListUsersWithnPaginate={fetchListUsersWithnPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <div className="table-users-container">
                        <TableUserPaginate
                            listUsers={listUsers}
                            handleClickBtnUpdate={handleClickBtnUpdate}
                            handleClickViewUpdate={handleClickViewUpdate}
                            handleDeleteUser={handleDeleteUser}
                            fetchListUsersWithnPaginate={fetchListUsersWithnPaginate}
                            pageCount={pageCount}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                    <ModalUpdateUser
                        show={showModalUpdateUser}
                        setShowModalUpdateUser={setShowModalUpdateUser}
                        fetchListAllUsers={fetchListAllUsers}
                        dataUpdate={dataUpdate}
                        restUpdateData={restUpdateData}
                        fetchListUsersWithnPaginate={fetchListUsersWithnPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
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
                        fetchListUsersWithnPaginate={fetchListUsersWithnPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
}

export default ManageUser;