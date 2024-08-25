import {useEffect, useState} from "react";
import {BACKEND_URL} from "../configs.ts";
import axios from "axios";

interface Blog {
    "id": string,
    "title": string,
    "content": string,
    "createdAt": string,
    "author": {
        "name": string
    }
}

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false)
    }, []);

    return {isAuthenticated, setIsAuthenticated, loading, setLoading};
};


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(response => {
                setBlogs(response.data.posts)
                setLoading(false)
            })
    }, []);

    return {
        loading,
        blogs
    }
}

export const useBlog = ({id}: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(response => {
                setBlog(response.data.post)
                setLoading(false)
            })
    }, [id]);

    return {
        loading,
        blog
    }
}

