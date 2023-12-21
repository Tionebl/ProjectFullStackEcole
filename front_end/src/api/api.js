import axios from 'axios';
export const useApi = () => {
    const baseUrl = 'http://localhost:8080/char';
    const handleResponse = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    };
    const handleRequestError = (error) => {
        console.error('API request error:', error);
    };
    const GetAll = async () => {
        try {
            const response = await axios.get(baseUrl);
            return handleResponse(response);
        }
        catch (error) {
            handleRequestError(error);
            return [];
        }
    };
    const Get = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/${id}`);
            return handleResponse(response);
        }
        catch (error) {
            handleRequestError(error);
            return {};
        }
    };
    const Add = async (char) => {
        try {
            const response = await axios.post(baseUrl, char);
            return handleResponse(response);
        }
        catch (error) {
            handleRequestError(error);
            return {};
        }
    };
    const Delete = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/${id}`);
            return handleResponse(response);
        }
        catch (error) {
            handleRequestError(error);
            return {};
        }
    };
    const Update = async (id, fields) => {
        try {
            const response = await axios.put(`${baseUrl}/${id}`, fields);
            return handleResponse(response);
        }
        catch (error) {
            handleRequestError(error);
            return {};
        }
    };
    return {
        GetAll,
        Get,
        Add,
        Delete,
        Update,
    };
};
