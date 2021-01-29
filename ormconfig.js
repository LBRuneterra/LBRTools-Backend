require('dotenv').config()
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  sid: process.env.DB_SID,
  schema: process.env.DB_SCHEMA,
  entities:
    process.env.NODE_ENV === 'development'
      ? ['src/typeorm/entities/**/*.ts', 'src/typeorm/views/**/*.ts']
      : ['./typeorm/entities/**/*.js', './typeorm/views/**/*.js'],
  synchronize: false
  // logging: true
}
