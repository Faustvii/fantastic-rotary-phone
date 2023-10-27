CREATE TABLE `match` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`player1_id` integer NOT NULL,
	`player2_id` integer NOT NULL,
	`player1_score` integer DEFAULT 0 NOT NULL,
	`player2_score` integer DEFAULT 0 NOT NULL,
	`winner_id` integer,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`player1_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player2_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `player1_idx` ON `match` (`player1_id`);--> statement-breakpoint
CREATE INDEX `player2_idx` ON `match` (`player2_id`);--> statement-breakpoint
CREATE INDEX `winner_idx` ON `match` (`winner_id`);--> statement-breakpoint
CREATE INDEX `date_idx` ON `match` (`createdAt`);