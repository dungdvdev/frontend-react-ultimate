function TableQuiz({ handleClickBtnUpdate, handleClickBtnDelete, listQuiz }) {

    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Difficulty</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {listQuiz && listQuiz.length > 0 &&
                    listQuiz.map((item, index) => {
                        return (
                            <tr key={`item-quiz-${index}`}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button onClick={() => handleClickBtnUpdate(item)} className='btn btn-warning mx-3'>Edit</button>
                                    <button onClick={() => handleClickBtnDelete(item)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        )
                    })

                }
            </tbody>
        </table>
    );
}

export default TableQuiz;