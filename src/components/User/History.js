import { useEffect, useState } from "react";
import { getHistoryUser } from "../../services/apiService";
import Moment from 'react-moment';

function History() {
    const [dataHistory, setDataHistory] = useState([]);

    useEffect(() => {
        fetchHistoryUser();
    }, []);

    const fetchHistoryUser = async () => {
        const res = await getHistoryUser();
        if (res && res.EC === 0) {
            setDataHistory(res.DT.data);
        }
    }
    const newData = dataHistory.slice(dataHistory.length - 10, dataHistory.length);

    return (
        <>
            <table className="table table-hover table-bordered" >
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Quiz Name</th>
                        <th scope="col">Total Question</th>
                        <th scope="col">Total Corect</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {newData && newData.length > 0 &&
                        newData.map((item, index) => {
                            return (
                                <tr key={`item-key-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.quizHistory.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td><Moment format="DD-MM-YYYY">{item.createdAt}</Moment></td>
                                </tr>
                            )
                        })
                    }
                    {dataHistory && dataHistory.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>Not found data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </>
    );
}

export default History;