import { useState } from "react";

const useSearchApi = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setsIError] = useState(false);


    const googleSearch = async (query) => {
        try {
            setIsLoading(true)
            let res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&q=${query}&start=1`)
            res = await res.json();
            setIsLoading(false)
            setsIError(false)
            return res;
        } catch (error) {
            setsIError(true)
            setIsLoading(false)
            return null;
        }
    }

    // YOUTUBE SEARCH
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '05a93b77d4msh839e9a754db1eeep150ea1jsn3ad6d4ad71b0',
            'x-rapidapi-host': 'youtube138.p.rapidapi.com'
        }
    };

    const youtubeSearch = async (query) => {
        try {
            setIsLoading(true)
            let res = await fetch(`https://youtube138.p.rapidapi.com/search/?q=${query}&hl=en&gl=US`, options);
            res = await res.json();
            setIsLoading(false)
            setsIError(false)
            return res;
        } catch (error) {
            setsIError(true)
            setIsLoading(false)
            return null;
        }
    }

    const videoDetail = async (videoId) => {
        try {
            setIsLoading(true)
            let res = await fetch(`https://youtube138.p.rapidapi.com/video/details/?id=${videoId}&hl=en&gl=US`, options);
            res = await res.json();
            setIsLoading(false)
            setsIError(false)
            return res;
        } catch (error) {
            setsIError(true)
            setIsLoading(false)
            return null;
        }
    }

    return { googleSearch, youtubeSearch, videoDetail, isLoading, isError };
}

export default useSearchApi
