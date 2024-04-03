import zod from 'zod'

export const userSignupSchema=zod.object({
    username: zod.string().min(3).max(20),
    email: zod.string().email(),
    password: zod.string().min(8).max(20)
})

export const userLoginSchema=zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(20)
})