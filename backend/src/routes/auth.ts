import {Hono} from "hono";
import {sign} from "hono/jwt";
import {getPrisma} from "../utils/prisma_utils";
import {signupInput} from "@bhaskar_xd/medium-common";

const auth = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

auth.post('/signup', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    //c.req.json() is for json and .parseBody() is for files tsc also gives an error that cant assign file to string type
    const body = await c.req.json()
    const { success, error, data } = signupInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({message: error})
    }
    try{
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        console.log("user : ", user)
        const payload={id: user.id}
        const token = await sign(payload, c.env.JWT_SECRET)
        return c.json({jwt: token, user: user});
    }catch (e){
        c.status(411)
        return c.json({message: e instanceof Error ? `Caught an error: ${e.message}` : "Caught an unknown error"})
    }
})

auth.get('/signin', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const body = await c.req.json()
    const { success, error, data } = signupInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({message: error})
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })
    if(!user){
        c.status(403); // status code for unauthorized
        return c.json({error: "user not found"});
    }
    const payload={id: user.id}
    const jwt = await sign(payload, c.env.JWT_SECRET)
    return c.json({jwt});
})

export default auth