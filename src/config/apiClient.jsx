import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'http://127.0.0.1:8000/',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Token 5557e05bf21a2d4fdd7eb367b93336c7012f65e8`,
    },
});


export default apiClient;