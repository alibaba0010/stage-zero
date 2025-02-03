// import { Hono } from "jsr:@hono/hono";
// const app = new Hono();
// // CORS Handling
// app.use("*", async (c, next) => {
//   c.header("Access-Control-Allow-Origin", "*");
//   c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (c.req.method === "OPTIONS") {
//     return new Response("", { status: 204 });
//   }
//   await next();
// });

// app.get("/", (c) => {
//   const response = {
//     email: "adedibu21@gmail.com",
//     current_datetime: new Date().toISOString(),
//     github_url: "https://github.com/alibaba0010/stage-zero",
//   };
//   return c.json(response);
// });
// Deno.serve(app.fetch);
// // if (import.meta.main) {
// //   Deno.serve({ hostname: "127.0.0.1", port: 5555 }, app.fetch);
// // }
import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";

// Function to check if a number is Armstrong
function isArmstrong(num: number): boolean {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, d) => acc + Math.pow(d, power), 0);
  return sum === num;
}

// Function to check if a number is prime
function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Function to check if a number is perfect (0 is not perfect)
function isPerfect(num: number): boolean {
  if (num <= 0) return false; // Fix: 0 should not be classified as perfect
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) sum += i;
  }
  return sum === num;
}

// Function to fetch fun fact
async function getFunFact(num: number): Promise<string> {
  try {
    const response = await fetch(`http://numbersapi.com/${num}/math`);
    return await response.text();
  } catch (error) {
    return "Fun fact unavailable.";
  }
}

// API Route
const router = new Router();
router.get("/api/classify-number", async (ctx: Context) => {
  const numberParam = ctx.request.url.searchParams.get("number");

  if (!numberParam || isNaN(Number(numberParam))) {
    ctx.response.status = 400;
    ctx.response.body = {
      number: numberParam,
      error: true,
    };
    return;
  }

  const number = Number(numberParam);
  const properties = [];

  if (isArmstrong(number)) properties.push("armstrong");
  properties.push(number % 2 === 0 ? "even" : "odd");

  // Fix: Ensure digit sum is numeric and correctly calculated even for negative numbers
  const digit_sum = Math.abs(number) // Handle negative numbers correctly
    .toString()
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  const responseData = {
    number,
    is_prime: isPrime(number),
    is_perfect: isPerfect(number),
    properties,
    digit_sum,
    fun_fact: await getFunFact(number),
  };

  ctx.response.body = responseData;
});

// Initialize server
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
