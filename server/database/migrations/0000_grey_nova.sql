CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`email_to_verify` text,
	`name` text NOT NULL,
	`avatar` text,
	`github_id` integer,
	`github_token` text,
	`twitch_id` text,
	`twitch_token` text,
	`verified_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_github_id_unique` ON `users` (`github_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_twitch_id_unique` ON `users` (`twitch_id`);