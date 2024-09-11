import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'  
import { PrismaClient } from '@prisma/client/edge'

export const taskRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

taskRouter.post('/tasks', async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const task = await prisma.task.create({
        data: {
           // task_id: body.task_id,
            title: body.title,
            description: body.description,
            status: (body.status).toUpperCase(),
            due_date: body.due_date,
            priority: (body.priority).toUpperCase()
        }
    })

    return c.json({
        id: task.task_id
    })
})

taskRouter.delete('tasks/:id', async(c) => {
    const taskId = parseInt(c.req.param('id'));
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    if(isNaN(taskId)) {
        return c.json({
            error: "Invalid task ID"
        }, 400)
    }

    try {
        const deletedTask = await prisma.task.delete({
            where: {
                task_id: taskId
            },
        })

        return c.json({
            message: "Task deleted successfully",
            task: deletedTask,
        })
    } catch(e) {
        c.json({ error: "Task not found "}, 404)
    }
})

taskRouter.put('tasks/:id', async(c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const task = await prisma.task.update({
            where: {
                task_id: Number(id),
            },
            data: {
                title: body.title,
                description: body.description,
                status: (body.status).toUpperCase(),
                due_date: body.due_date,
                priority: (body.priority).toUpperCase(),
            }
        })

        return c.json({
            id: task.task_id
        })
    } catch(e) {
        return c.json({ error: "An error occurred while updating the blog."}, 500)
    }
})

taskRouter.get('/tasks', async(c) => {
    const status = c.req.query('status')
    const priority = c.req.query('priority')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const filters: any = {};
        if(status) {
            filters.status = status.toUpperCase();
        }
        if(priority) {
            filters.priority = priority.toUpperCase();
        }

        const task = await prisma.task.findMany({
            where: filters,
        }) 

    return c.json({
        task
    })
    } catch(e) {
        return c.json({ error: "Failed to fetch tasks"}, 500)
    }
})

taskRouter.get('/tasks/:id', async(c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const task = await prisma.task.findFirst({
            where: {
                task_id: Number(id)
            },
        })

        return c.json({
            task
        })
    } catch(e) {
        c.status(411);
        return c.json({
            message: "Error while fetching tasks"
        });
    }
})