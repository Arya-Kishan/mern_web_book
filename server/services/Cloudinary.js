import { v2 as cloudinary } from 'cloudinary';
import streamifier from "streamifier"

cloudinary.config({
    cloud_name: 'dwvuqahw2',
    api_key: '563441375781984',
    api_secret: 'x2dEVPTIwie3i9dBNG2-wyCMz1Y'
});


export const getImageUrl = async (file) => {
    let url = await uploadAssesAndGetUrl(file, "image");
    return url;
}

export const getVideoUrl = async (file) => {
    let url = await uploadAssesAndGetUrl(file, "video");
    return url;
}

export const getAudioUrl = async (file) => {
    let url = await uploadAssesAndGetUrl(file, "video");
    return url;
}


export const uploadAssesAndGetUrl = async (file, type) => {

    try {
        if (file) {

            let streamUpload = (file) => {
                return new Promise((resolve, reject) => {


                    let stream = cloudinary.uploader.upload_stream(
                        {
                            resource_type: type,
                            folder: "web-book"
                        },
                        (error, result) => {
                            if (result) {
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        }
                    );


                    streamifier.createReadStream(file.buffer).pipe(stream);

                });
            };


            async function upload(file) {
                let result = await streamUpload(file);
                console.log(result.secure_url);
                return result.secure_url;
            }

            return upload(file);
        }
    } catch (error) {
        console.log(error);
        console.log("inside getEroor of getUrl");
        return ("CANT GET THE IMAGE URL")
    }
}