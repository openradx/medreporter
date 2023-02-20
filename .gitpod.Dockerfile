FROM gitpod/workspace-postgres

# Install Playwright system dependencies and browsers
RUN npx playwright install && npx playwright install-deps
