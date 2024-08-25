import {Quote} from "../components/Quote.tsx";
import {Auth} from "../components/Auth.tsx";

export const Signin = () => {
    return (
        <div className={"grid sm:grid-cols-2 grid-cols-1"}>
            <div><Auth type={"signin"}/></div>
            <div className={"sm:block hidden"}><Quote/></div>
        </div>
    )
}