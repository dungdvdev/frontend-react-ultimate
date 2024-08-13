import './Dashboard.scss';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDashboardOverview } from '../../../services/apiService';
import { useEffect, useState } from 'react';
import TableUser from './TableUser';
import { getAllUsers } from '../../../services/apiService';


function Dashboard() {
    const [dataDashboard, setDataDashboard] = useState([]);
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetchDashboard();
        fetchListAllUsers();
    }, []);

    const fetchDashboard = async () => {
        let res = await getDashboardOverview();
        if (res && res.EC === 0) {
            setDataDashboard(res.DT);
        }
    }

    const fetchListAllUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    }

    console.log(dataDashboard);
    const data = [
        {
            name: 'Quizzes',
            Qz: `${dataDashboard?.others?.countQuiz}`
        },
        {
            name: 'Questions',
            Qs: `${dataDashboard?.others?.countQuestions}`
        },
        {
            name: 'Answers',
            As: `${dataDashboard?.others?.countAnswers}`
        }

    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h3>Analytics Dashboard</h3>
                <h6>Welcome back, We've missed you. 👋</h6>
            </div>
            <hr className='mt-4 mb-4' />
            <div className="dashboard-content">
                <div className='c-left'>
                    <div className='grid-container'>
                        <div className='grid-item'>
                            <h6>Total Quiz</h6>
                            <h3>{dataDashboard && dataDashboard?.others?.countQuiz}</h3>
                        </div>
                        <div className='grid-item'>
                            <h6>Total Answers</h6>
                            <h3>{dataDashboard && dataDashboard?.others?.countAnswers}</h3>
                        </div>
                        <div className='grid-item'>
                            <h6>Total Questions</h6>
                            <h3>{dataDashboard && dataDashboard?.others?.countQuestions}</h3>
                        </div>
                        <div className='grid-item'>
                            <h6>Total Users</h6>
                            <h3>{dataDashboard && dataDashboard?.users?.total}</h3>
                        </div>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="95%" height={"100%"}>
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                            <Bar dataKey="Qs" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                            <Bar dataKey="As" fill="orange" activeBar={<Rectangle fill="orange" stroke="orange" />} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className='dashboard-info mt-3'>
                <div className="dashboard-header">
                    <h3>New Users</h3>
                    <hr />
                </div>
                {/* <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>John</td>
                            <td>@twitter</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td >Danny</td>
                            <td>@twitter</td>
                        </tr>

                    </tbody>
                </table> */}
                <TableUser listUsers={listUsers} />
            </div>
        </div>
    );
}

export default Dashboard;