# Stage 1: Build Stage
FROM ubuntu:20.04 AS build
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages for building
RUN apt-get update && apt-get install -y \
  curl \
  gnupg \
  libgtk-3-dev \
  libnotify-dev \
  libgconf-2-4 \
  libnss3-dev \
  libxss1 \
  libasound2-dev \
  libxtst6 \
  xauth \
  libgbm-dev \
  libatk-bridge2.0-dev \
  libx11-xcb-dev \
  libxcb-dri3-0 \
  libgbm1 \
  build-essential

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
  apt-get install -y nodejs

# Create app directory
WORKDIR /app

# Copy package.json and bun.lockb (if you use lockfile)
COPY package.json bun.lockb ./

# Install app dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Electron app
RUN bun run build

# Stage 2: Runtime Stage
FROM ubuntu:20.04

# Install necessary packages for running the application
RUN apt-get update && apt-get install -y \
  libgtk-3-0 \
  libnotify4 \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  libgbm1 \
  libatk-bridge2.0-0 \
  libx11-xcb1 \
  libxcb-dri3-0 \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy built application from build stage
COPY --from=build /app /app

# Install Bun in runtime stage
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Set the entrypoint for the container
CMD ["bun", "run", "start"]
