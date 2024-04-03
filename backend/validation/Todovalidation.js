import zod from 'zod'

const todovalidationSchema =zod.object({
    title: zod.string(),
    description: zod.string(),
    completed: zod.boolean()
})

export default todovalidationSchema;