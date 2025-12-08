import { resolve } from "node:path";
import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "../db/db";

await migrate(db, { migrationsFolder: resolve(__dirname, "../migrations") });
