export default {
  schema: ["./src/db/schemas/auth.ts", "./src/db/schemas/expenses.ts"],
  out: "./migrations",
  driver: "d1-http",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
};
