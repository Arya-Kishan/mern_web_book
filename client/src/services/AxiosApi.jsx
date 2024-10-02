import axios from 'axios'
import { toast } from 'react-toastify'
import { handleError } from '../helper/CreateError';

const getMethod = (method) => {
    const methods = [
        {
            method: "get",
            message: "not fetched"
        },
        {
            method: "post",
            message: "not added"
        },
        {
            method: "put",
            message: "not updated"
        },
        {
            method: "delete",
            message: "not deleted"
        },
        {
            method: "patch",
            message: "not updated"
        },
    ];
    let message = methods.filter((e) => (e.method == method))
    return (message[0].message);
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    toast(getMethod(error.config.method));
    if (error.status > 500 && error.status < 600) {
        toast("Server Error")
    }
    handleError(`${error.name}:${error.message}`, `${error?.response?.data?.message ?? "Error Occured"}`, `AXIOS-API - ${error?.stack?.split("at")?.slice(0, 2)?.join("at")}`);
    return Promise.reject(error);
});

export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, body, params, headers }) => {
            try {
                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data: body,
                    params,
                    headers: {
                        'x-webbook-jwt-routes': localStorage.getItem("x-webbook-jwt-routes")
                    },
                })
                return { data: result.data }
            } catch (axiosError) {
                const err = axiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }