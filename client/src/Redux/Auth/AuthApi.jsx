import { toast } from "react-toastify";

export const createUser = async (formData, endpoint) => {

    return new Promise(async (resolve, reject) => {

        let res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (res.status == 200) {

            if (res?.headers?.get('x-webbook-jwt-routes')) {
                localStorage.setItem("x-webbook-jwt-routes", res?.headers?.get('x-webbook-jwt-routes'))
            }

            res = await res.json();
            resolve(res)
        } else {
            if (res.status == 429) {
                toast(res.statusText + "Try after 15 mins");
                reject(null)
            } else {
                res = await res.json();
                toast(res.message)
                reject(null)
            }
        }

    })

}

export const loginUser = async (formData, endpoint) => {

    return new Promise(async (resolve, reject) => {

        let res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });


        if (res.status == 200) {

            if (res?.headers?.get('x-webbook-jwt-routes')) {
                localStorage.setItem("x-webbook-jwt-routes", res?.headers?.get('x-webbook-jwt-routes'))
            }

            res = await res.json();
            // USED FOR MANAGING GUEST USER NOT ALLOWING POST, PUT AUR DELETE OPERATION
            if (res.data.name == "Guest" && res.data.email == "guest@gmail.com") {
                localStorage.setItem("webbook-guest-login", "guest")
            } else {
                localStorage.setItem("webbook-guest-login", "user")
            }

            resolve(res.data)
        } else {
            if (res.status == 429) {
                toast(res.statusText + "Try after 15 mins");
                reject(null)
            } else if (res.status > 500 && res.status < 600) {
                toast("Server Error try again");
                reject(null)
            } else {
                res = await res.json();
                reject(res);
            }
        }

    })

}

export function axiosCheckUser(formData, endPoint) {
    return new Promise(async (resolve, reject) => {

        try {

            let res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL + endPoint}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "x-webbook-jwt-routes": localStorage.getItem("x-webbook-jwt-routes")
                },
            })

            if (res.status == 200) {
                res = await res.json();
                resolve(res.data)
            } else {
                if (res.status == 429) {
                    toast(res.statusText + "Try after 15 mins");
                }
                reject(null)
            }

        } catch (error) {

            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                // This typically indicates a network error, which could be a connection refusal
                console.error('Connection refused or network error:', error);
                toast('Connection refused or network error:', error);
            }

        }

    });
}