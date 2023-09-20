import { SetStateAction, useState } from "react";
import CryptoJS from "crypto-js";

export const useFormInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const handleChange = async (e: { currentTarget: { value: any } }) => {
    const tempValue = await e.currentTarget.value;
    setValue(tempValue);
  };

  return {
    value,
    reset: (newValue: SetStateAction<string>) => setValue(newValue),
    onIonChange: handleChange,
    onKeyUp: handleChange,
  };
};

export const checkLoginStatus = () => {
/*   const cookies = document.cookie.split(";");
  let loginToken = null;
  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");

    if (name === "loginToken") {
      loginToken = value;
    }
  });
  if (loginToken) {
    return loginToken;
  }
  return null; */
  return localStorage.getItem("loginToken")
};


export const setCookie = (name: any, value: any, days: number) => {
/*   const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;

  // Setzen Sie das SameSite-Attribut auf "None" und Secure auf "true" für HTTPS
  const cookieOptions = `SameSite=None; Secure; ${expires}; path=/`;

  document.cookie = `${name}=${value}; ${cookieOptions}`;
  const test = checkLoginStatus() */

  localStorage.setItem("loginToken", value)
};


export function deleteCookie(name: any) {
/*   document.cookie =
    name +
    "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure"; */
    localStorage.removeItem("loginToken")
}

export const validateForm = (fields: any[]) => {
  let errors: { id: any; message: string }[] = [];
  fields.forEach((field) => {
    if (field.required) {
      const fieldValue = field.input.state.value;

      if (fieldValue === "") {
        const error = {
          id: field.id,
          message: `Please check your ${field.id}`,
        };

        errors.push(error);
      }
    }
  });

  return errors;
};

export const getLoginData = (fields: any[]) => {
	let data = {
		"email": '',
		"password": '',
	}
	fields.forEach((field) => {
		if(field.id === 'email'){
			data.email = field.input.state.value
		}else if (field.id === 'password' ){
			data.password = field.input.state.value
		}
	})
	return data;
}


export const hashPassword = async (password: any) => {
  const hashedPassword = await CryptoJS.SHA256(password);
  return hashedPassword;
};
