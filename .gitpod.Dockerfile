FROM gitpod/workspace-postgres

# Install Playwright system dependencies and browsers
RUN pnpm dlx playwright install --with-deps
