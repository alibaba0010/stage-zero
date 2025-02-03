# Stage One Backend & DevOps

A simple CRUD(GET) operation using Deno with CORS Handling

## Installation

Git clone the folder

### Install package using

```bash
deno run -A https://deno.land/x/oak/mod.ts
```

### Run the deno application using

```bash
deno task dev
```

# Usage

# Get user info

## Route

### http://localhost:8000/api/classify-number?number=<value>

### https://stage-zero-jlof.onrender.com/api/classify-number?number=<value>

```bash

## Response message
{
    "number": 500,
    "is_prime": false,
    "is_perfect": false,
    "properties": [
        "even"
    ],
    "digit_sum": 5,
    "fun_fact": "500 is the number of planar partitions of 10."
}

Erro Response message
{
    "number": "value",
    "error": true
}
```

## Referneces

[HNG Hire Nodejs Developers](https://hng.tech/hire/nodejs-developers)
