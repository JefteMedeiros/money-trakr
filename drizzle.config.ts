export default {
  schema: ["./src/db/schemas/auth.ts", "./src/db/schemas/expenses.ts"],
  out: "./migrations",
  dialect: "turso",
  driver: "d1-http",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  },
};
