import axios from "axios";

export const handleError = async (error = "", errorMessage = "", errorInComponent = "", errorFrom = "frontend") => {
    let newError = { error, errorMessage, errorInComponent, errorFrom };
    try {
        let res = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/error`, newError, {
            headers: {
                "x-error-token": import.meta.env.VITE_ERROR_TOKEN
            }
        });
    } catch (error) {
        console.log("error not created in databse");
        console.log(error);
    }
}