import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {Blogs} from "./pages/Blogs.tsx";
import {Signup} from "./pages/Signup.tsx";
import {Signin} from "./pages/Signin.tsx";
import {Blog} from "./pages/Blog.tsx";
import {Publish} from "./pages/Publish.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
    return (
        <Routes>
            <Route path="/blogs" element={
                <ProtectedRoute>
                    <Blogs/>
                </ProtectedRoute>
            }/>
            <Route path="/blog/:id" element={
                <ProtectedRoute>
                    <Blog/>
                </ProtectedRoute>
            }/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/publish" element={
                <ProtectedRoute>
                    <Publish/>
                </ProtectedRoute>
            }/>
            <Route path="*" element={<Navigate to='/blogs'/>}/>
        </Routes>
    )
}

export default App
