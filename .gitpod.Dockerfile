FROM gitpod/workspace-postgres

# Used when installing browser on initial workspace setup (see .gitpod.yml).
# We can't install the browsers here, but only the system dependencies as
# browsers are updated often and can't be found then in old images.
ENV PLAYWRIGHT_BROWSERS_PATH=/workspace/.playwright-browsers

# Install Playwright system dependencies
RUN npx playwright install-deps
