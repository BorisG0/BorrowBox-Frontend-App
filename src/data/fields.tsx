import { useFormInput } from "./utils";

export const useLoginFields = () => {

    return [
        {
            id: "name",
            label: "Name",
            required: true,
            input: {
                
                props: {
                    
                    type: "text",
                    placeholder: "username"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            required: true,
            input: {
                
                props: {
                    type: "password",
                    placeholder: "*******"
                },
                state: useFormInput("")
            }
        }
    ];
}