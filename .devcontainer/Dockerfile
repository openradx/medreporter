FROM mcr.microsoft.com/devcontainers/javascript-node:3-22-bookworm

# Additional dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends postgresql-client

# Used when installing browser on initial workspace setup (see .gitpod.yml).
# We can't install the browsers here, but only the system dependencies as
# browsers are updated often and can't be found then in old images.
ENV PLAYWRIGHT_BROWSERS_PATH=/workspaces/.playwright-browsers

# Install Playwright system dependencies
RUN npx playwright install-deps
