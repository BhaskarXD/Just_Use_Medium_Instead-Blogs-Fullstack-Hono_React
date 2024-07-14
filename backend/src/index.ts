import { Hono } from 'hono'
import auth from "./routes/auth";
import blog from "./routes/blog";

const app = new Hono()
const apiV1 = new Hono();
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// For most projects, Method 2 (defining the prefix in the main app file) as compared to first (defining the prefix in the handler like const auth = new Hono().basePath('/auth') is generally preferred because it provides centralized control and flexibility. This approach makes it easier to manage and update the API structure, especially as it grows or changes over time. By defining the base paths in the main app file, you maintain a clear overview of your API's structure and ensure consistency across all route handlers.
apiV1.route('/auth', auth)
apiV1.route('/blog', blog)

app.route('/api/v1', apiV1)
export default app

