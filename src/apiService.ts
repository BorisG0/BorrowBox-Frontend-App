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
        const response = await apiService.get('hello');
        return response;
    }catch(error){
        throw error;
    }
}

export const fetchItemData = async (): Promise<AxiosResponse<any>> => {
    try{
        const response = await apiService.get('items');
        return response;
    }catch(error){
        throw error;
    }
}

export const startRental = async (rental: any): Promise<AxiosResponse<any>> => {
    try{
        const response = await apiService.post('startRental', rental);
        return response;
    }catch(error){
        throw error;
    }
}

export default apiService;