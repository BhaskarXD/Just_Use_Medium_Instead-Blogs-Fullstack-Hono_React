import {Link, useNavigate} from "react-router-dom";
import {LabelledInput} from "./LabelledInput.tsx";
import {useState} from "react";
import {signupInput} from "@bhaskar_xd/medium-common";
import {BACKEND_URL} from "../configs.ts";
import axios from "axios";
import {useAuth} from "../hooks";

export const Auth = ({type}: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [authInputs, setAuthInputs] = useState<signupInput>({
        name: "",
        email: "",
        password: "",
    })
    const {setIsAuthenticated, setLoading} = useAuth();


    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/${type === 'signup' ? 'signup' : 'signin'}`, authInputs)
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt)
            localStorage.setItem("user", response.data.user.name)
            setIsAuthenticated(true);
            navigate("/blogs")
        } catch (e) {
            console.log('Error in auth api', e)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-2 p-4">
            <div className="font-extrabold text-3xl">{type == "signup" ? "Create An Account" : "Sing In"}</div>
            <div
                className={"font-medium text-xl text-slate-500"}>{type === "signup" ? "Already have an account? " : "Dont have an account? "}
                <Link
                    className={"underline"}
                    to={type === "signup" ? "/signin" : "/signup"}>{type === 'signup' ? 'Sing In' : 'Sing Up'}</Link>
            </div>

            {/*to make its child take full width i have to do w-full on child, but i also have to do w-full on the div below so that it itself first stretches that much*/}
            <div className={"max-w-sm w-full"}>
                {/*The expression value={authInputs.name as string} is using TypeScript’s type assertion to specify that authInputs.name should be treated as a string type*/}
                {/*Type Mismatch: If authInputs.name is of a different type (e.g., number or undefined), but you know it will be a string in this specific situation, type assertion can help bypass TypeScript errors.*/}
                {/*Avoid Errors: When TypeScript cannot infer the type correctly and you are confident of the type, type assertion can help avoid type errors.*/}
                {/*Be cautious with type assertions. They can bypass TypeScript's type checking and may lead to runtime errors if your assumptions are incorrect. It’s usually better to ensure that types are properly defined and handled in your code rather than relying heavily on type assertions.*/}
                {type === 'signup' && <LabelledInput label={"Username"} placeholder={"fuck me"} value={authInputs.name as string}
                                                     onChange={(e) => setAuthInputs((p) => ({
                                                         ...p,
                                                         name: e.target.value
                                                     }))}/>}
                <LabelledInput label={"Email"} type={"email"} placeholder={"fuck@you.com"} value={authInputs.email}
                               onChange={(e) => setAuthInputs((p) => ({...p, email: e.target.value}))}/>
                <LabelledInput label={"Password"} type={"password"} placeholder={"fuck off"} value={authInputs.password}
                               onChange={(e) => setAuthInputs((p) => ({...p, password: e.target.value}))}/>
                <button type="button"
                        className="w-full mt-6 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={handleSubmit}
                >
                    {type === 'signup' ? 'Sign Up' : 'Sing In'}
                </button>
            </div>

        </div>
    )
}