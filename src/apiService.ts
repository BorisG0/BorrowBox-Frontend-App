import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8080/';

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

export const fetchItemData = async (): Promise<AxiosResponse<any>> => {
    try{
        const response = await apiService.get('getDocumentByID/items/64ede1a0c1440cab375577f2');
        return response;
    }catch(error){
        throw error;
    }
}

export default apiService;