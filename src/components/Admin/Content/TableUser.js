function TableUser({ listUsers, handleClickBtnUpdate, handleClickViewUpdate, handleDeleteUser }) {
    return (
        <>
            <table className="table table-hover table-bordered" >
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`item-key-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button onClick={() => handleClickViewUpdate(item)} className="btn btn-secondary">View</button>
                                        <button onClick={() => handleClickBtnUpdate(item)} className="btn btn-warning mx-3">Update</button>
                                        <button onClick={() => handleDeleteUser(item)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>Not found data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </>
    );
}

export default TableUser;