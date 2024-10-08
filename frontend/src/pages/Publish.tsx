import {AppBar} from "../components/AppBar.tsx";
import {useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../configs.ts";
import {useNavigate} from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePublishPost = async () => {
        // setLoading(true)
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title,
            content: description
        }, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'}})
        navigate(`/blog/${response.data.id}`)
        setLoading(false)
    }
    return (
        <>
            <AppBar/>
            <div className={"flex justify-center items-center p-10"}>
                <div className={`relative p-5 w-screen max-w-3xl ${loading ? 'opacity-50' : ''}`}>
                    <div className="mb-5">
                        <input type="text" id="base-input" onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                               className="bg-gray-300 xtext-gray-950 text-xl font-bold rounded-lg block w-full p-2.5 "
                               placeholder="Title"/>
                    </div>
                    {/*<div className="w-full mb-5">*/}
                    {/*    <input type="text" name="title" id="title"*/}
                    {/*           className="pl-2 block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none ml-1"*/}
                    {/*           placeholder="Title" required/>*/}
                    {/*</div>*/}
                    <textarea id="blog_content" rows={14} onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Write your blog or do whatever, who cares..."></textarea>
                    <div>
                        <button type="button" onClick={handlePublishPost}
                                className="mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            Publish Post
                        </button>
                    </div>
                    {loading &&
                        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                            <svg aria-hidden="true"
                                 className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>}
                </div>
            </div>
        </>
    )
}