# Base image
FROM ubuntu:22.04 AS base

# Install ca-certificates to fix SSL issue
RUN apt-get update && \
  apt-get install -y --no-install-recommends ca-certificates && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Install dependencies including curl
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  curl \
  libgbm1 \
  git \
  libx11-xcb1 \
  libxcb-dri3-0 \
  libxtst6 \
  libnss3 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libxss1 \
  libasound2 \
  libdrm2 \
  build-essential \
  python3 && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Install nodejs 18 and bun
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
  apt-get install -y nodejs && \
  npm install -g bun && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Stage 1: build
FROM base AS build

# Working directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies and build
RUN bun install && bun run build

# Stage 2: run
FROM base AS run

# Copy build from stage 1
COPY --from=build /app /app

# Working directory
WORKDIR /app

# Command to run
CMD ["bun", "run", "start", "--", "--no-sandbox"]
