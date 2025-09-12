module.exports = {
  apps: [
    {
      name: 'agents-dev',
      cwd: './apps/agents',
      script: 'yarn',
      args: 'dev',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'web-dev',
      cwd: './apps/web',
      script: 'yarn',
      args: 'dev',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
