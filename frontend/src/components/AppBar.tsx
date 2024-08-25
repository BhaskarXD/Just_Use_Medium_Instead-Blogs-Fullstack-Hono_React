import {Avatar} from "./Avatar.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export const AppBar = () => {
    const username = (localStorage.getItem("user") || "Anon")
    const [showSettings, setShowSettings] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear();
        navigate("/singin")

    }
    return <div className={"bg-blue-50 w-full border-b flex justify-between items-center px-8 py-3 "}>
        <div className={"text-xl font-semibold"}>
            <Link to={"/blogs"}
                  className={"shadow-md text-blue-400 bg-blue-100 border border-blue-200 p-2 rounded-md cursor-pointer"}>Just
                Use <a
                    href={"https://medium.com"} target={"_blank"}
                    className="font-medium text-blue-950 dark:text-blue-500 hover:underline"
                    onClick={(e) => e.stopPropagation()}>Medium</a> Instead</Link> Blogs
        </div>
        <div>
            <Link to={"/publish"}>
                <button type="button"
                        className="mr-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New
                </button>
            </Link>
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                type="button"
                onClick={() => {
                    setShowSettings((prev) => !prev)
                }}
            >
                <Avatar size={"big"} name={username}/>
            </button>
            {showSettings && <div id="dropdown"
                                  className="absolute z-10 right-8 bg-gray-400 divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul className="flex flex-col p-2 min-h-3 py-2 px-4 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton">
                    <li className={"pt-2"}>
                        <span className={"text-gray-950 font-medium"}>Logged in as {localStorage.getItem("user")}</span>
                    </li>
                    <li className={"pt-5"}>
                        <button type="button" onClick={handleLogout}
                                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Logout
                        </button>
                    </li>
                </ul>
            </div>}
        </div>
    </div>

}