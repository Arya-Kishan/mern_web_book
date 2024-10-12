import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import LoaderButton from '../../components/Button/LoaderButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectUserId } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import Error from '../../components/Error';
import MyImage from '../../components/MyImage';
import audioIcon from "../../assets/audio.svg"
import videoIcon from "../../assets/video.svg"
import imageIcon from "../../assets/image.svg"
import linkIcon from "../../assets/link.svg"
import chooseIcon from "../../assets/choose.svg"
import { useAddPostMutation, useEditPostMutation, useGetSinglePostQuery } from '../../Redux/Post/postApi';
import Toggle from '../../components/common/Toggle';
import { toast } from 'react-toastify';
import ReactPlayer from "react-player";
import ReactAudioPlayer from 'react-audio-player';

// Used for both creating nad updating question cards
const CreatePost = () => {

    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [choose, setChoose] = useState("choose");
    const [tags, setTags] = useState(["action", "adventure", "air", "war"]);
    const [selectedtags, setSelectedTags] = useState("");

    const [fileType, setFileType] = useState("image");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [searchParams] = useSearchParams();
    const userId = useSelector(selectUserId);

    const [fetch, setFetch] = useState(true);

    const navigate = useNavigate();

    const { data: post } = useGetSinglePostQuery(searchParams.get("postId"), { skip: fetch });

    const [addPost, { isLoading: isPostCreating, isSuccess: isPostCreatingSuccess }] = useAddPostMutation();
    const [editPost, { isLoading: isPostUpdating, isSuccess: isPostUpdatingSuccess }] = useEditPostMutation();


    const getVirutalImageUrl = (file) => {
        console.log(file);
        if (typeof (file) == "string" && file.includes("http")) {
            setSelectedFileUrl(file)
        } else {
            let url = URL.createObjectURL(file)
            setSelectedFileUrl(url);
        }

    }

    const handleFormat = (word) => {
        setSelectedFileUrl("")
        setFileType(word)
    }

    const handleUserChoose = (word) => {
        console.log((word));
        setSelectedFileUrl("")
        setChoose(word)
    }

    const checkFileSize = (file) => {

        let fileSize = Math.floor(file.size / 1000);
        console.log(fileSize);

        if (fileType == "image" && fileSize > 100) {
            toast("Upload image less than 100KB")
            return false;
        }

        if (fileType == "video" && fileSize > 5000) {
            toast("Upload video less than 5MB")
            return false;
        }

        if (fileType == "audio" && fileSize > 1000) {
            toast("Upload image less than 1MB")
            return false;
        }

        return true;

    }

    const onSubmit = (data) => {

        if (choose == "choose" && !checkFileSize(data.file[0])) {
            return null;
        }


        let formdata = new FormData();
        formdata.append("userId", userId)
        formdata.append("title", data.title)
        formdata.append("description", data.description)
        formdata.append("tags", selectedtags.trim().split("#").filter((e) => (e.length > 1)))

        if (choose == "choose") {
            formdata.append("fileType", fileType)
            formdata.append("image", fileType == "image" ? data.file[0] : "")
            formdata.append("video", fileType == "video" ? data.file[0] : "")
            formdata.append("audio", fileType == "audio" ? data.file[0] : "")
        } else {
            formdata.append("file", JSON.stringify({ fileType: fileType, fileUrl: data.file }))
        }

        if (searchParams.get("type") == "update") {
            editPost(formdata);
        } else {
            addPost(formdata);
        }

    }

    useEffect(() => {
        if (searchParams.get("type") == "update") {
            setFetch(false);
        }
    }, [searchParams.get("type")])


    useEffect(() => {
        if (isPostCreatingSuccess || isPostUpdatingSuccess) {
            // navigate("/home/feed")
        }
    }, [isPostCreatingSuccess, isPostUpdatingSuccess])


    useEffect(() => {
        if (post) {
            setValue("title", post.title)
            setValue("description", post.description)
        }
    }, [post])

    return (
        <div className='flex flex-col gap-5'>

            <div className='w-full flex justify-between items-center'>
                <p className='text-2xl font-semibold capitalize'>{searchParams.get("type")} Post</p>
                <div className='flex gap-1 items-center'>
                    <Toggle buttonsArr={[{ text: "image", pic: imageIcon }, { text: "video", pic: videoIcon }, { text: "audio", pic: audioIcon }]} onChange={handleFormat} />
                </div>
            </div>

            {/* FORM FOR CREATING QUESTION CARD */}
            <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex justify-center items-center'>
                    <div className='max-[400px]:w-full w-[46%] lg:w-[32%] h-fit aspect-square bg-bgInput1 overflow-hidden flex items-center justify-center'>
                        {
                            fileType == "image"
                                ?
                                <MyImage className={"w-full h-full"} imageClass='object-contain' src={selectedFileUrl} />
                                :
                                fileType == "video"
                                    ?
                                    <ReactPlayer
                                        url={`${selectedFileUrl}`}
                                        height="100%"
                                        width="100%"
                                        controls
                                        style={{ backgroundColor: "#000000" }}
                                        playing={false}
                                    />
                                    :
                                    <ReactAudioPlayer
                                        src={`${selectedFileUrl}`}
                                        controls
                                    />
                        }
                    </div>
                </div>

                <div className='w-full flex justify-between items-center'>

                    <p className='capitalize'>{fileType}</p>
                    <div className='w-[100px] md:w-[200px] flex gap-1 items-center'>
                        <Toggle buttonsArr={[{ text: "choose", pic: chooseIcon }, { text: "link", pic: linkIcon }]} onChange={handleUserChoose} />
                    </div>

                </div>

                <input
                    type={`${choose == "choose" ? "file" : "text"}`}
                    accept={`${fileType}/*`}
                    className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white'
                    {...register('file', { required: true })}
                    placeholder='file...'
                    onChange={(e) => choose == "choose" ? getVirutalImageUrl(e.target.files[0]) : getVirutalImageUrl(e.target.value)}
                />

                <p>Title</p>
                <input
                    className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white'
                    {...register('title', { required: true })}
                    placeholder='Title...'
                />
                {errors.title && <p className='text-red-600'>title is required.</p>}

                <p>Description</p>
                <textarea
                    className='h-[200px] p-2 bg-bgInput1 rounded-xl w-full border-2 border-white'
                    {...register('description', { required: true })}
                    placeholder='Description...'
                />
                {errors.description && <p className='text-red-600'>description is required.</p>}

                <p>HashTags</p>
                <div className='flex flex-col gap-2'>
                    <input
                        className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white'
                        {...register('tags', { required: false })}
                        value={selectedtags}
                        onChange={(e) => setSelectedTags(e.target.value)} placeholder='#tags'
                    />
                    <div className='w-full bg-bgHistoryPop py-2 rounded-xl'>
                        {tags.map((e, i) => (<p key={i} onClick={() => setSelectedTags(selectedtags.concat(`#${e} `))} className='px-2'>{e}</p>))}
                    </div>
                </div>

                <div className='flex justify-center items-center mt-10'>
                    <LoaderButton width={'200px'} text={searchParams.get("type")} loading={isPostCreating || isPostUpdating} />
                </div>

            </form>



        </div>
    )
}

export default CreatePost