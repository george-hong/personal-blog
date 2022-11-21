module.exports = {
  apps: [
    {
      name   : "personal-blog-service",
      script : "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1,
      watch: false,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
