import { asc } from "drizzle-orm";
import { drizzleDb, sqlClient } from "./dbClient";
import { userTbl } from "./schema";

const now = performance.now();
await sqlClient.sync();
console.log("Synced in", performance.now() - now, "ms");
const test = await drizzleDb.query.userTbl.findFirst({
  orderBy: asc(userTbl.elo),
});
console.log(`Found ${test?.name} with elo ${test?.elo}`);
