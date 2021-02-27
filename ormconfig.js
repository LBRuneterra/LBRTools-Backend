require('dotenv').config()
module.exports = {
  name: 'default',
  type: 'postgres',
  database: 'lbr',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  sid: process.env.DB_SID,
  schema: process.env.DB_SCHEMA,
  migrations: process.env.NODE_ENV === 'development' ? ["./src/db/migrations/*.ts"]:["./src/db/migrations/*.js"],
  cli: {
    migrationsDir: "./src/db/migrations"
  },
  entities:
    process.env.NODE_ENV === 'development'
      ? ['src/typeorm/entities/**/*.ts']
      : ['./typeorm/entities/**/*.js'],
  synchronize: false,
  // logging: true
}
