# 🐳 Docker Practice API

A minimal Node.js API built specifically for practicing Docker. There's no database, no TypeScript, no complexity — just enough to focus entirely on learning how Docker works.

## What's in this project

```
├── server.js          # The Express app
├── package.json       # Dependencies
├── Dockerfile         # Instructions for building the image
└── .dockerignore      # Files Docker should ignore
```

## Before you start

Make sure you have Docker Desktop installed and running. You should see the Docker icon in your menu bar (Mac) or system tray (Windows).

Verify it's working:

```bash
docker --version
```

You should see something like `Docker version 24.x.x`. If you get "command not found", Docker isn't installed yet — download it from [docker.com](https://www.docker.com/products/docker-desktop/).

## Running the app without Docker first

Before Dockerizing anything, it's worth seeing the app work normally so you know what to expect:

```bash
npm install
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see:

```json
{
  "message": "Hello from Docker!",
  "environment": "development",
  "port": 3000,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

Try the other routes too:
- [http://localhost:3000/health](http://localhost:3000/health)
- [http://localhost:3000/users](http://localhost:3000/users)

Stop the server with `Ctrl+C` when you're done. Now let's run the exact same app inside a container.

## Running the app with Docker

### Step 1 — Build the image

```bash
docker build -t docker-practice-api .
```

What's happening here:
- `docker build` — tells Docker to build an image
- `-t docker-practice-api` — gives the image a name ("t" is short for "tag")
- `.` — use the Dockerfile in the current directory

The first time you run this it will take 30–60 seconds. Docker is downloading the Node 20 base image and installing your dependencies. You'll see each step in your Dockerfile execute one by one.

Confirm the image was created:

```bash
docker images
```

You should see `docker-practice-api` in the list.

### Step 2 — Run a container

```bash
docker run -p 3000:3000 docker-practice-api
```

What's happening here:
- `docker run` — creates and starts a container from the image
- `-p 3000:3000` — maps port 3000 on your machine to port 3000 inside the container (without this, you can't reach the app in your browser)
- `docker-practice-api` — the image to run

Open [http://localhost:3000](http://localhost:3000). The app is now running inside a container — but behaves identically to before.

Stop the container with `Ctrl+C`.

### Step 3 — Pass in environment variables

The app reads `PORT` and `NODE_ENV` from environment variables. Try changing them at runtime:

```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  docker-practice-api
```

Hit [http://localhost:3000](http://localhost:3000) again. Notice the `environment` field in the response has changed to `production` — without changing any code or rebuilding the image. This is how real teams manage config differences between development, staging, and production.

## Useful commands to know

```bash
# See all running containers
docker ps

# See all containers including stopped ones
docker ps -a

# Run a container in the background (detached mode)
docker run -d -p 3000:3000 docker-practice-api

# Stop a running container
docker stop <container-id>

# See logs from a running container
docker logs <container-id>

# Follow logs in real time (like tail -f)
docker logs -f <container-id>

# Open a shell inside a running container
docker exec -it <container-id> sh

# Remove a stopped container
docker rm <container-id>

# List all images on your machine
docker images

# Remove an image
docker rmi docker-practice-api
```

> **Tip:** You don't need to type the full container ID — the first 3-4 characters are enough. So `docker stop a3f` works if your container ID starts with `a3f`.

## Things to try

These exercises will help the concepts click:

**1. Break it on purpose**

Remove the `-p 3000:3000` flag and try to open the app in your browser:

```bash
docker run docker-practice-api
```

You'll get a "connection refused" error. This is what it looks like when a container is running but its port isn't exposed to your machine. Add the flag back to fix it.

**2. Open a shell inside the container**

While the container is running (use `-d` to run it in the background first), open a shell inside it:

```bash
docker run -d -p 3000:3000 docker-practice-api   # start in background
docker ps                                          # get the container ID
docker exec -it <container-id> sh                 # open a shell
```

Now you're inside the container. Try:

```bash
ls                    # see the files Docker copied in
echo $NODE_ENV        # check the environment variable
cat server.js         # read the source file
```

Type `exit` to leave the shell. The container keeps running.

**3. Watch what changes between builds**

Make a small change to `server.js` — change the `message` field in the home route to something different. Then rebuild:

```bash
docker build -t docker-practice-api .
```

Watch the output carefully. Docker skips steps 1–3 (they're cached) and only re-runs from the `COPY . .` step onward. This is layer caching in action — and why the order of instructions in a Dockerfile matters.

**4. Try passing a different port**

```bash
docker run -p 4000:3000 docker-practice-api
```

Now open [http://localhost:4000](http://localhost:4000). The app still thinks it's running on port 3000 internally — but you're reaching it on port 4000 on your machine. This is the port mapping at work: `host:container`.


## Reading the Dockerfile

Open `Dockerfile` and read it alongside this explanation:

```dockerfile
FROM node:20
```
Start from the official Node 20 image. This gives us a Linux environment with Node already installed — we don't have to install Node ourselves.

```dockerfile
WORKDIR /app
```
All subsequent commands run from the `/app` directory inside the container. It's created automatically if it doesn't exist.

```dockerfile
COPY package.json ./
RUN npm install
```
Copy `package.json` first, then install dependencies. These two steps are cached together — if `package.json` hasn't changed, Docker reuses the cached layer and skips `npm install` entirely on the next build.

```dockerfile
COPY . .
```
Now copy the rest of the source code. This step runs on every build when code changes — but because it comes *after* `npm install`, we don't reinstall packages unnecessarily.

```dockerfile
EXPOSE 3000
```
Documents that the app listens on port 3000. This doesn't actually open the port — that's what `-p` does at runtime. Think of it as a note to anyone reading the Dockerfile.

```dockerfile
CMD ["node", "server.js"]
```
The command that runs when the container starts.

## What's next

Once you're comfortable with the basics here, the natural next steps are:

1. **Add a database with Docker Compose** — wire this API up to a Postgres container so they talk to each other
2. **Try a multi-stage build** — keep the final image small by separating the build step from the run step
