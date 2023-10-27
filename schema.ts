import { int } from "drizzle-orm/mysql-core";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTbl = sqliteTable(
  "user",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email"),
    picture: text("picture")
      .notNull()
      .$defaultFn(() => "404.png"),
    elo: integer("elo").notNull().default(1500),
  },
  (table) => {
    return {
      eloIdx: index("elo_idx").on(table.elo),
    };
  }
);

export const matchTbl = sqliteTable(
  "match",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    player1Id: integer("player1_id")
      .notNull()
      .references(() => userTbl.id),
    player2Id: integer("player2_id")
      .notNull()
      .references(() => userTbl.id),
    player1Score: integer("player1_score").notNull().default(0),
    player2Score: integer("player2_score").notNull().default(0),
    winnerId: integer("winner_id"),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  },
  (table) => {
    return {
      player1Idx: index("player1_idx").on(table.player1Id),
      player2Idx: index("player2_idx").on(table.player2Id),
      winnerIdx: index("winner_idx").on(table.winnerId),
      createdAtIdx: index("date_idx").on(table.createdAt),
    };
  }
);
