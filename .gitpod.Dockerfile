FROM gitpod/workspace-postgres

# Install Blitz globally.
# See also https://classic.yarnpkg.com/en/docs/cli/global/
# We can't use `export PATH="$(yarn global bin):$PATH"` here directly
RUN yarn global add blitz@alpha
ENV PATH=/home/gitpod/.yarn/bin:$PATH
