import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8080/hello';

const apiService = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const fetchHelloData = async (): Promise<AxiosResponse<any>> => {
    try{
        const response = await apiService.get('');
        return response;
    }catch(error){
        throw error;
    }
}

export default apiService;