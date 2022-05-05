const { DATABASE_HOST: host, DATABASE_PORT: port, DATABASE_USERNAME: username, DATABASE_PASSWORD: password,
  DATABASE_NAME: database, DATABASE_LOGGING: logging } = process.env;

export const ormConfig = {
  host,
  port,
  username,
  password,
  database,
  entities: ["./dist/src/entities/*.js"],
  logging: Boolean(logging),
  synchronize: true
}