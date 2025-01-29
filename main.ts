import { Hono } from "jsr:@hono/hono";
const app = new Hono();
// CORS Handling
app.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (c.req.method === "OPTIONS") {
    return new Response("", { status: 204 });
  }
  await next();
});

app.get("/", (c) => {
  const response = {
    email: "adedibu21@gmail.com",
    timestamp: new Date().toISOString(),
    githubUrl: "https://github.com/alibaba0010/stage-zero",
  };
  return c.json(response);
});
Deno.serve(app.fetch);
