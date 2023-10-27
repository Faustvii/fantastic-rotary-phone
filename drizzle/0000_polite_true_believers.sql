CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`picture` text NOT NULL,
	`elo` integer DEFAULT 1500 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `elo_idx` ON `user` (`elo`);