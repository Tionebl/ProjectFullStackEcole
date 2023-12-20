import axios, { AxiosResponse } from 'axios';

interface Char {
}

export const useApi = () => {
  const baseUrl = 'http://localhost:8080/char';
  

  const handleResponse = <T>(response: AxiosResponse<T>): T => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  };

  const handleRequestError = (error: Error) => {
    console.error('API request error:', error);
    throw error;
  };

  const GetAll = async (): Promise<Char[]> => {
    try {
      const response = await axios.get<Char[]>(baseUrl);
      return handleResponse(response);
    } catch (error) {
      handleRequestError(error as Error);
      throw error;
    }
  };
  
  const Get = async (id: string): Promise<Char> => {
    try {
      const response = await axios.get<Char>(`${baseUrl}/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleRequestError(error as Error);
      throw error;
    }
  };
  
  const Add = async (char: Char): Promise<Char> => {
    try {
      const response = await axios.post<Char>(baseUrl, char);
      return handleResponse(response);
    } catch (error) {
      handleRequestError(error as Error);
      throw error;
    }
  };
  
  const Delete = async (id: string): Promise<Char> => {
    try {
      const response = await axios.delete<Char>(`${baseUrl}/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleRequestError(error as Error);
      throw error;
    }
  };
  
  const Update = async (id: string, fields: Partial<Char>): Promise<Char> => {
    try {
      const response = await axios.put<Char>(`${baseUrl}/${id}`, fields);
      return handleResponse(response);
    } catch (error) {
      handleRequestError(error as Error);
      throw error;
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

