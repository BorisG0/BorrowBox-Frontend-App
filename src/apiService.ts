import axios, { AxiosResponse } from "axios";
import { filter } from "ionicons/icons";
import { checkLoginStatus } from "./data/utils";

type ReportForBackend = {
  userId: string;
  itemId: string;
  reportState: boolean;
  description: string;
}

const API_URL = "http://localhost:8080";

const apiService = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    console.log(loginData)
    const loginDataWithName = { // backend erwartet name und nicht email
      name: loginData.email,
      password: loginData.password,
    }
    const response = await apiService.post("login", loginDataWithName);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentUser = async (): Promise<AxiosResponse<any>> => {
  try {
    const userId = checkLoginStatus();
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

export const fetchItemTags = async (itemId: any): Promise<AxiosResponse<any>> => {
  try {
      const response = await apiService.get("tags/" + itemId);
      return response;
  } catch (error) {
    throw error;
  }
};
export const fetchUserItemData = async (): Promise<AxiosResponse<any>> => {
  try {
    const userId = checkLoginStatus();
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
    const userId = checkLoginStatus();
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
  itemId: string,
  location: string,
  report: string,
  reportCritical: boolean,
): Promise<AxiosResponse<any>> => {
  try {
    const returnData = {
      itemId: itemId,
      location: location,
      reportDescription: report,
      reportState: reportCritical,
      userId: checkLoginStatus(),
    };
    const response = await apiService.post("endRental", returnData);
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

export const updateItem = async (data: any): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.put("item", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (id: any): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.delete(`item/${id}`);
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

export const addFilter = async (data: any): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.post("addFilter", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteFilter = async (id: any): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.delete(`deleteFilter`, { data: { id } });
    return response;
  } catch (error) {
    throw error;
  }
};

function filterObjectsById(objects: any, idToExclude: any) {
  return objects.filter((obj: { id: any }) => obj.id !== idToExclude);
}

export const fetchUser = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.get(`users`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (data: any): Promise<AxiosResponse<any>> => {
  try {
    const response = await apiService.post(`user`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUsers = async (data: any): Promise<AxiosResponse<any>> => {
  try {
    console.log(data)
    const response = await apiService.post(`users`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fixReport = async (data: any): Promise<AxiosResponse<any>> => {
  try {
    const reportForBackend: ReportForBackend = {
      userId: data.userId,
      itemId: data.itemId,
      reportState: false,
      description: "Das Item wurde repariert",
    };
    const response = await apiService.post(`report`, reportForBackend);
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadItemPhoto = async (itemId: string, photoFile: File): Promise<AxiosResponse<any>> => {
  try {
    const formData = new FormData();
    formData.append("photo", photoFile);

    console.log("uploadItemPhoto", itemId, photoFile)

    const response = await apiService.post(`uploadItemPhoto`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default apiService;
