import axios from 'axios';

const api = axios.create({
    baseURL: 'https://leaderboard-task-jf04.onrender.com/api',
})

export default api;