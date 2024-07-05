#!/bin/bash

# Script to build and run a Docker container for an Electron application using
# Bun as the build tool.

# Constants
readonly DOCKERFILE="Dockerfile"
readonly IMAGE_NAME="brezel"

# Checks if docker is installed.
check_docker_installed() {
  if ! command -v docker &>/dev/null; then
    echo "Docker is not installed. Please install docker first."
    exit 1
  fi
}

# Checks if docker is running
check_docker_running() {
  if ! docker info &>/dev/null; then
    echo "Docker is not running. Please start docker first."
    exit 1
  fi
}

# Builds the docker image
build_docker_image() {
  echo "Building Docker image '${IMAGE_NAME}'"

  if ! docker build -t "${IMAGE_NAME}" -f "${DOCKERFILE}" .; then
    echo "Failed to build Docker image '${IMAGE_NAME}'"
    exit 1
  fi

  echo "Docker image '${IMAGE_NAME}' built successfully"
}

# Runs the docker container
run_docker_container() {
  echo "Running Docker container '${IMAGE_NAME}'"

  if ! docker run --rm -it "${IMAGE_NAME}"; then
    echo "Failed to run Docker container '${IMAGE_NAME}'"
    exit 1
  fi

  echo "Docker container '${IMAGE_NAME}' exited successfully"
}

main() {
  check_docker_installed
  check_docker_running

  build_docker_image
  run_docker_container

  echo "Docker container exited successfully"
}

# Trap unexpected exits and provides a clean message
trap 'echo >&2 "Script interrupted unexpectedly."; exit 1' INT TERM

main
