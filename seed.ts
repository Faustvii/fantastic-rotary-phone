import { eq } from "drizzle-orm";
import { drizzleDb, sqlClient } from "./dbClient";
import { matchTbl, userTbl } from "./schema";

type newUser = typeof userTbl.$inferInsert;
type newMatch = typeof matchTbl.$inferInsert;

await sqlClient.sync();

for (let index = 0; index < 10; index++) {
  const player: newUser = {
    name: `Player ${index}`,
    elo: 1000,
    email: "fake",
  };

  await drizzleDb.insert(userTbl).values(player);
}
await sqlClient.sync();
for (let index = 0; index < 100; index++) {
  const players = await drizzleDb.query.userTbl.findMany();
  const playerOne = players[Math.floor(Math.random() * players.length)];
  const playerTwo = players[Math.floor(Math.random() * players.length)];
  const matchDate = new Date();

  const result = Math.random() > 0.5 ? playerOne : playerTwo;

  const scoreDiff = Math.floor(Math.random() * 100);

  const matchInsert: newMatch = {
    player1Id: playerOne.id,
    player2Id: playerTwo.id,
    winnerId: result.id,
    player1Score: result.id === playerOne.id ? scoreDiff : 0,
    player2Score: result.id === playerTwo.id ? scoreDiff : 0,
    createdAt: matchDate,
  };

  await drizzleDb.transaction(async (trx) => {
    await trx.insert(matchTbl).values(matchInsert);
    const players = [playerOne, playerTwo];

    for (const player of players) {
      await trx
        .update(userTbl)
        .set({
          elo: player.id == result.id ? result.elo + 32 : result.elo - 32,
        })
        .where(eq(userTbl.id, player.id));
    }
  });
}
