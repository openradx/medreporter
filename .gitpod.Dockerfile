FROM gitpod/workspace-postgres

ENV PNPM_HOME="/home/gitpod/.pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN npm install -g pnpm@7
RUN pnpm add -g blitz
