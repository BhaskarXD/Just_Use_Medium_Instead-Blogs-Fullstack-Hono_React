import {BlogCard} from "../components/BlogCard.tsx";
import {AppBar} from "../components/AppBar.tsx";
import {useBlogs} from "../hooks";
import {BlogSkeleton} from "./BlogSkeleton.tsx";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    return (
        <div>
            <AppBar/>
            {loading ?
            <div>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
            </div>
                :
                <div className={"flex flex-col justify-center items-center relative"}>
            <div className={"flex flex-col w-screen max-w-screen-md"}>
                {...blogs.map((blog) => <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate={blog.createdAt}/>)}
            </div>
                </div>
            }
        </div>
    )
}