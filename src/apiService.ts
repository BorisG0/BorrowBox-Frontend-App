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

export const fetchItemDetailData = async (itemId: any): Promise<AxiosResponse<any>> => {
    try{
        const response = await apiService.get('getDocumentByID/items/'+ itemId);
        return response;
    }catch(error){
        throw error;
    }
}

export default apiService;