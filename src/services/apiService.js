import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data);
}
const putUpdateNewUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data);
}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email: email, password: password, delay: 5000 });
}

const postRegister = (email, password, username) => {
    return axios.post('api/v1/register', { email: email, password: password, username: username });
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getQuizDataById = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data });
}

const postCreateNewQuiz = (description, name, type, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', type);
    data.append('quizImage', image);

    return axios.post('api/v1/quiz', data);
}

const getAllQuizData = () => {
    return axios.get(`api/v1/quiz/all`);
}

const deleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}

const putUpdateQuiz = (id, description, name, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.put('api/v1/quiz', data);
}

const postCreateNewQuestionForQuiz = (quizId, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quizId);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}

const postAssignQuizUser = (userId, quizId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        userId, quizId
    });
}

const getQuizQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

const postUpsertQuizQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data });
}

const logout = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email, refresh_token
    });
}

export {
    postCreateNewUser, getAllUsers, putUpdateNewUser,
    deleteUser, getUserWithPaginate, postLogin, postRegister,
    getQuizByUser, getQuizDataById, postSubmitQuiz, postCreateNewQuiz,
    getAllQuizData, deleteQuiz, putUpdateQuiz, postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion, postAssignQuizUser, getQuizQA,
    postUpsertQuizQA, logout
} 