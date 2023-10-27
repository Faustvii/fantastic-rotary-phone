import { Config, createClient } from "@libsql/client";
import { config } from "./config";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const { DATABASE_CONNECTION_TYPE } = config.env;

const options = {
  local: { url: "file:local.sqlite" },
  remote: {
    url: config.env.DATABASE_URL,
    authToken: config.env.DATABASE_AUTH_TOKEN!,
  },
  "local-replica": {
    url: "file:local.sqlite",
    syncUrl: config.env.DATABASE_URL,
    authToken: config.env.DATABASE_AUTH_TOKEN!,
  },
} satisfies Record<typeof DATABASE_CONNECTION_TYPE, Config>;

export const sqlClient = createClient(options[DATABASE_CONNECTION_TYPE]);

export const drizzleDb = drizzle(sqlClient, {
    schema,
    logger: false,
  });
  