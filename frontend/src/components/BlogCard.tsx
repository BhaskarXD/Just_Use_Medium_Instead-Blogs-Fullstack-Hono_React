import {Avatar} from "./Avatar.tsx";
import moment from 'moment/moment.js'
import {Link} from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
                             authorName, title, content, publishedDate, id
                         }: BlogCardProps) => {
    const readTime = Math.ceil((content?.length || 0) / (1190)) //average 238 words per min * 5 character word average = 1000
    const humanReadableDate = `${moment(publishedDate).format('dddd, MMMM Do YYYY')} (${moment(publishedDate).fromNow()})`;
    return (
        <Link to={`/blog/${id}`}>
            <div className={"border-b-2 border-slate-400 p-4 cursor-pointer"}>
                <div className={"flex justify-normal items-center"}>
                    <Avatar name={authorName}/>
                    <span className={"font-light pl-2 text-sm"}>{authorName}</span>
                    <CircularDot/>
                    <span className={"text-sm font-extralight text-slate-600 pl-2"}>{humanReadableDate}</span>
                </div>
                <div className={"text-xl font-bold"}>
                    {title}
                </div>
                <div className={"text-md font-thin"}>
                    {content?.length > 420 ? content.slice(0, 420) + '...' : content}
                </div>
                <div className={"text-slate-500 text-sm pt-2"}>
                    {`${readTime} min${readTime > 1 ? 's' : ''} read`}
                </div>
            </div>
        </Link>
    )
}

const CircularDot = () => {
    return (
        <div className={"h-1 w-1 rounded-full bg-slate-500 ml-2"}></div>
    )
}