import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("arya requesting");
    console.log(config.method);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response.config.method);

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
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