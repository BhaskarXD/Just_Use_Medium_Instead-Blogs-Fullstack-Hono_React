import {Hono} from "hono";
import {jwt} from "hono/jwt";
import {getPrisma} from "../utils/prisma_utils";
import {createBlogInput, updateBlogInput } from "@bhaskar_xd/medium-common";
import {update} from "hono/dist/types/jsx/dom/render";

const blog = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

blog.use('/*', (c, next) => {
    const jwtMiddleware = jwt({
        secret: c.env.JWT_SECRET,
    })
    return jwtMiddleware(c, next)
})


// TODO: add pagination
blog.get('/bulk', async (c) => {
    const prims = getPrisma(c.env.DATABASE_URL);
    try{
        const posts = await prims.post.findMany();
        return c.json({'posts': posts})

    }catch (e){
        c.status(411)
        return c.json({message: e instanceof Error ? `Caught an error: ${e.message}` : "Caught an unknown error"})
    }
})

blog.get('/:id', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const id = c.req.param('id')

    try{
        const post = await prisma.post.findFirst({
            where:{
                id: id
            }
        })
        if(!post){
            c.status(404)
            return c.json({'message': "Post doesn't exits"})
        }
        return c.json({id: post.id})
    }catch (e){
        c.status(411)
        return c.json({message: e instanceof Error ? `Caught an error: ${e.message}` : "Caught an unknown error"})
    }
})

blog.post('/', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const body = await c.req.json()
    const { success, error } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({'message': error})
    }
    const payload = c.get('jwtPayload')

    try{
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: payload.id,
            }
        })
        return c.json({id: post.id, post: post})
    }catch (e){
        c.status(411)
        return c.json({message: e instanceof Error ? `Caught an error: ${e.message}` : "Caught an unknown error"})
    }
})

blog.put('/', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const body = await c.req.json()
    const { success, error } = updateBlogInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.json({'message': error});
    }

    try{
        const post = await prisma.post.update({
            where:{
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json({id: post.id})
    }catch (e){
        c.status(411)
        return c.json({message: e instanceof Error ? `Caught an error: ${e.message}` : "Caught an unknown error"})
    }
})


export default blog