import {AppBar} from "../components/AppBar.tsx";
import {useBlog} from "../hooks";
import {useParams} from "react-router-dom";
import {Avatar} from "../components/Avatar.tsx";
import {CenteredLoader} from "../components/CenteredLoader.tsx";

export const Blog = () => {
    const {id} = useParams();
    const {loading, blog} = useBlog({id: id || ""});


    const formatDate = (dateString: string|undefined) => {
        const options = {year: "numeric", month: "long", day: "numeric"}
        // @ts-expect-error function needs the options
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // const formattedTime = (dateString) => {
    //     const date = new Date(dateString);
    //     return new Intl.DateTimeFormat('en-US', {
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         second: 'numeric',
    //     }).format(date);
    // }

    return (
        <>
            <AppBar/>
            {loading ?
                <CenteredLoader/>
                // <BlogSkeleton/>
                :
                <div className={"flex justify-center items-center mb-10"}>
                    <div className={"grid grid-cols-12 p-2 pt-5 w-screen max-w-screen-lg"}>
                        <div className={"col-span-8"}>
                            <div className={"text-5xl font-extrabold"}>
                                {blog?.title}
                            </div>
                            <div className={"text-slate-500 pt-3"}>
                                Posted On {formatDate(blog?.createdAt)}
                            </div>
                            <div className={"pt-5"} style={{whiteSpace: 'pre-line'}}>
                                {blog?.content}
                            </div>
                        </div>
                        <div className={"col-span-4"}>
                            <div className={"text-slate-500 text-lg"}>
                                Author
                            </div>
                            <div className={"flex justify-between items-center"}>
                                <div className={""}>
                                    <Avatar size={"small"} name={(localStorage.getItem("user") || "Anon")}/>
                                </div>
                                <div className={"pl-2"}>
                                    <div
                                        className={"text-xl font-bold text-slate-800"}>{blog?.author.name || "Anonymous"}</div>
                                    <div className={"text-sm text-slate-500"}>
                                        Random catch phrase about the author's ability to grab attention.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}