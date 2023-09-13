import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8080/';

const apiService = axios.create({
    baseURL: API_URL,
    timeout: 3000,
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

export const fetchLogin = async (loginData: any): Promise<AxiosResponse<any>> => {
    try{
        const response = await apiService.post('login', loginData);
        console.log(response)
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

export const fetchItemDetailData = async (itemId: any): Promise<AxiosResponse<any>> => {
    try{
        const response = await apiService.get('getDocumentByID/items/'+ itemId);
        return response;
    }catch(error){
        throw error;
    }
}

export default apiService;