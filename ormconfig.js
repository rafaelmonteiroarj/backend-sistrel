const config = require("config");

module.exports = {
  timezone: "UTC",
  type: config.get("App.db.type"),
  host: config.get("App.db.host"),
  port: config.get("App.db.port"),
  username: config.get("App.db.username"),
  password: config.get("App.db.password"),
  database: config.get("App.db.database"),
  autoSchemaSync: true,
  synchronize: false,
  logging: false,
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/shared/migrations"
  }
};
