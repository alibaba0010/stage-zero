FROM denoland/deno:2.1.6

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
# Uncomment the following two lines if you have a deps.ts file
#RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
COPY . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache --reload main.ts

CMD ["run", "--cached-only", "--allow-net", "main.ts"]