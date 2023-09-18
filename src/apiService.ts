import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8080/";

const apiService = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

const userId = "aaabbbaaabbbaaabbbaaabbb"; //test id, muss noch richtig gesetzt werden

export const fetchHelloData = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.get("hello");
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchItemData = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.get("items");
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchLogin = async (
  loginData: any
): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.post("login", loginData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchUserById = async (
  userId: any
): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.get("user/" + userId);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (
  userData: any
): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.put("user", userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchTags = async (userId: any): Promise<AxiosResponse<any>> => {
  try {
    if (userId != null) {
      const response = await apiService.get("tags/" + userId);
      return response;
    } else {
      const response = await apiService.get("tags");
      return response;
    }
  } catch (error) {
    throw error;
  }
};
export const fetchUserItemData = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.get("useritems/" + userId);
    return response;
  } catch (error) {
    throw error;
  }
};

export const startRental = async (
  itemId: string
): Promise<AxiosResponse<any>> => {
  try {
    const rental = {
      itemId: itemId,
      userId: userId,
    };
    const response = await apiService.post("startRental", rental);
    return response;
  } catch (error) {
    throw error;
  }
};

export const endRental = async (
  itemId: string
): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.put("endRental/" + itemId);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchItemDetailData = async (
  itemId: any
): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.get("items/" + itemId);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserTag = async (data: any): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.post("tag", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addItem = async (item: any): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.post("addItem", item);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default apiService;
