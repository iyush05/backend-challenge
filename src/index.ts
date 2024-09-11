import { Hono } from 'hono'
import { taskRouter } from './routes/user';

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

app.route("/api/v1/", taskRouter);

export default app
