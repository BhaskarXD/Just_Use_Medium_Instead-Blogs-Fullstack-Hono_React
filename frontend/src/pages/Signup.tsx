import {Quote} from "../components/Quote.tsx";
import {Auth} from "../components/Auth.tsx";

export const Signup = () => {
    return (
        <div className={"grid sm:grid-cols-2 grid-cols-1"}>
            <div><Auth type={"signup"}/></div>
            <div className={"sm:block hidden"}><Quote/></div>
        </div>
    )
}